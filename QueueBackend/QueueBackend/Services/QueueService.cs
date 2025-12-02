using Dapper;
using Npgsql;
using System.Data;

namespace QueueBackend.Services
{
    public class QueueDto
    {
        public string Queue { get; set; }
        public DateTime Time { get; set; }
    }

    public class QueueService
    {
        private readonly string _connectionString;

        public QueueService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<QueueDto> loadData() 
        {
            using var conn = new NpgsqlConnection(_connectionString);
            await conn.OpenAsync();

            using var transaction = await conn.BeginTransactionAsync();

            var queueRow = await conn.QueryFirstOrDefaultAsync<(string current_letter, int current_number)>(
                "SELECT current_letter, current_number FROM queue_counter WHERE id = 1 FOR UPDATE",
                transaction: transaction
            );

            return new QueueDto
            {
                Queue = $"{queueRow.current_letter}{queueRow.current_number}",
                Time = DateTime.Now
            };
        }

        public async Task<QueueDto> GetNextQueueAsync()
        {
            using var conn = new NpgsqlConnection(_connectionString);
            await conn.OpenAsync();

            using var transaction = await conn.BeginTransactionAsync();

            var queueRow = await conn.QueryFirstOrDefaultAsync<(string current_letter, int current_number)>(
                "SELECT current_letter, current_number FROM queue_counter WHERE id = 1 FOR UPDATE",
                transaction: transaction
            );

            if (queueRow == default)
            {
                await conn.ExecuteAsync(
                    "INSERT INTO queue_counter(id, current_letter, current_number, updated_at) VALUES(1, 'A', 0, now())",
                    transaction: transaction
                );
                queueRow = ("A", 0);
            }

            string nextLetter = queueRow.current_letter;
            int nextNumber = queueRow.current_number + 1;

            if (nextNumber > 9)
            {
                nextNumber = 0;
                nextLetter = ((char)(nextLetter[0] + 1)).ToString();
                if (nextLetter[0] > 'Z')
                    nextLetter = "A";
            }

            await conn.ExecuteAsync(
                "UPDATE queue_counter SET current_letter = @Letter, current_number = @Number, updated_at = now() WHERE id = 1",
                new { Letter = nextLetter, Number = nextNumber },
                transaction: transaction
            );

            await transaction.CommitAsync();

            return new QueueDto
            {
                Queue = $"{nextLetter}{nextNumber}",
                Time = DateTime.Now
            };
        }

        public async Task ResetQueueAsync()
        {
            using var conn = new NpgsqlConnection(_connectionString);
            await conn.OpenAsync();

            using var transaction = await conn.BeginTransactionAsync();

            var exists = await conn.ExecuteScalarAsync<int>(
                "SELECT COUNT(*) FROM queue_counter WHERE id = 1",
                transaction: transaction
            );

            if (exists == 0)
            {
                await conn.ExecuteAsync(
                    "INSERT INTO queue_counter(id, current_letter, current_number, updated_at) VALUES(1, 'A', 0, now())",
                    transaction: transaction
                );
            }
            else
            {
                await conn.ExecuteAsync(
                    "UPDATE queue_counter SET current_letter = 'A', current_number = 0, updated_at = now() WHERE id = 1",
                    transaction: transaction
                );
            }

            await transaction.CommitAsync();
        }
    }
}

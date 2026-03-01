import json
from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'orders',
    bootstrap_servers='localhost:9092',
    group_id='payment-service',
    value_deserializer=lambda v: json.loads(v.decode('utf-8'))
)

print("💳 Payment Service running - waiting for orders...\n")

for message in consumer:
    order = message.value
    print(f"💳 PAYMENT SERVICE")
    print(f"   Processing payment for Order #{order['order_id']}")
    print(f"   Customer: {order['customer']}")
    print(f"   Amount: ${order['price']}")
    print(f"   Status: ✓ Payment charged successfully!\n")
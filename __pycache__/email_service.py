import json
from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'orders',
    bootstrap_servers='localhost:9092',
    group_id='email-service',
    value_deserializer=lambda v: json.loads(v.decode('utf-8'))
)

print("📧 Email Service running - waiting for orders...\n")

for message in consumer:
    order = message.value
    print(f"📧 EMAIL SERVICE")
    print(f"   Sending confirmation for Order #{order['order_id']}")
    print(f"   To: {order['customer']}")
    print(f"   Item: {order['item']} - ${order['price']}")
    print(f"   Status: ✓ Confirmation email sent!\n")
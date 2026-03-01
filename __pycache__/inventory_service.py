import json
from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'orders',
    bootstrap_servers='localhost:9092',
    group_id='inventory-service',
    value_deserializer=lambda v: json.loads(v.decode('utf-8'))
)

print("📦 Inventory Service running - waiting for orders...\n")

for message in consumer:
    order = message.value
    print(f"📦 INVENTORY SERVICE")
    print(f"   Updating stock for Order #{order['order_id']}")
    print(f"   Item: {order['item']}")
    print(f"   Status: ✓ Inventory updated successfully!\n")
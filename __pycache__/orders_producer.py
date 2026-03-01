import json
import time
from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

print("=== E-Commerce Order System ===")
print("Type 'quit' to exit\n")

order_id = 1

while True:
    customer = input("Enter customer name: ")
    if customer.lower() == 'quit':
        break
    
    item = input("Enter item ordered: ")
    price = input("Enter price: ")

    order = {
        "order_id": order_id,
        "customer": customer,
        "item": item,
        "price": float(price),
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }

    producer.send('orders', order)
    producer.flush()
    print(f"\n✓ Order #{order_id} placed and sent to Kafka!\n")
    order_id += 1

producer.close()
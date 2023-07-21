import boto3
import json
import uuid

def upload_dynamodb_details(data):
    # Create a client for DynamoDB
    dynamodb = boto3.client('dynamodb')

    # Iterate over the objects in the JSON data and add them to DynamoDB
    for item in data:
        # Generate a random ID if 'id' field is not present in the item
        if 'id' not in item:
            item['id'] = str(uuid.uuid4())

        response = dynamodb.put_item(
            TableName='SurfAIHackathon',  # Replace with your DynamoDB table name
            Item={
                'ID': {'S': item['id']},
                'Order Date': {'S': item['Order Date']},
                'Ship Date': {'S': item['Ship Date']},
                'Ship Mode': {'S': item['Ship Mode']},
                'Segment': {'S': item['Segment']},
                'Country': {'S': item['Country']},
                'City': {'S': item['City']},
                'State': {'S': item['State']},
                'Postal Code': {'N': str(item['Postal Code'])},
                'Region': {'S': item['Region']},
                'Category': {'S': item['Category']},
                'Sub-Category': {'S': item['Sub-Category']},
                'Product Name': {'S': item['Product Name']},
                'Quantity': {'N': str(item['Quantity'])},
                'Discount': {'N': str(item['Discount'])},
                'Profit': {'N': str(item['Profit'])}
            }
        )
        print(response)
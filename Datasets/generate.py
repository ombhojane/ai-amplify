import pandas as pd
import numpy as np
from datetime import datetime

# Create a list of geographical regions, distributors, and retailers
regions = ['South America', 'Asia', 'Europe', 'North America']
distributors = ['MobileX', 'Mobite', 'MobilePlanet', 'MobileGarage']
retailers = ['Oneplus', 'Samsung', 'Apple', 'Redmi', 'Oppo']

# Generate random sales data for 12 months
data = []
for region in regions:
    for distributor in distributors:
        for retailer in retailers:
            for month in range(1, 13):
                units_sold = np.random.randint(50, 200)
                revenue = units_sold * np.random.randint(100, 200)
                
                # Get the last day of the month
                last_day_of_month = pd.Timestamp(datetime(2023, month, 1) + pd.offsets.MonthEnd()).day
                
                # Generate random day of the month
                day_of_month = np.random.randint(1, last_day_of_month + 1)
                
                # Generate random week number (assuming 4 weeks in a month)
                week_number = np.random.randint(1, 5)
                
                # Create the date in datetime format
                date = datetime(2023, month, day_of_month)
                
                data.append([region, distributor, retailer, date, week_number, units_sold, revenue])

# Create a DataFrame from the generated data
columns = ['Geographical Region', 'Distributor', 'Retailer', 'Date', 'Week Number', 'Number of Units Sold', 'Revenue Generated']
df = pd.DataFrame(data, columns=columns)

# Display the first few rows of the dataset
print(df.head())

# Save the DataFrame as a CSV file
csv_file_path = 'sales_data_with_date.csv'
df.to_csv(csv_file_path, index=False)

print(f"CSV file '{csv_file_path}' has been created.")

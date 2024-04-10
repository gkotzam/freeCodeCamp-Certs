import pandas as pd


def calculate_demographic_data(print_data=True):
    # Read data from file
    df = pd.read_csv('adult.data.csv')

    # How many of each race are represented in this dataset? This should be a Pandas series with race names as the index labels.
    race_count = df['race'].value_counts()

    # What is the average age of men?
    average_age_men = round( df.groupby('sex')['age'].mean()['Male'] , 1)

    # What is the percentage of people who have a Bachelor's degree?
    percentage_bachelors =  round( df['education'].value_counts()['Bachelors'] / df.shape[0] * 100 , 1)

    # What percentage of people with advanced education (`Bachelors`, `Masters`, or `Doctorate`) make more than 50K?
    # What percentage of people without advanced education make more than 50K?
    over_50k = df.groupby(['education','salary']).size()[:,'>50K']
    edu = df['education'].value_counts()

    # with and without `Bachelors`, `Masters`, or `Doctorate`
    higher_education =  edu['Bachelors'] + edu['Masters'] + edu['Doctorate']
    lower_education = edu.sum() - higher_education

    # percentage with salary >50K
    higher_education_rich = over_50k['Bachelors'] + over_50k['Masters'] + over_50k['Doctorate']
    lower_education_rich = round( (over_50k.sum() - higher_education_rich) / lower_education *100 , 1)
    higher_education_rich = round( higher_education_rich / higher_education * 100, 1) 

    # What is the minimum number of hours a person works per week (hours-per-week feature)?
    min_work_hours = df['hours-per-week'].min()

    # What percentage of the people who work the minimum number of hours per week have a salary of >50K?
    num_min_workers = df['hours-per-week'].value_counts()[1]

    rich_percentage = round( df.groupby(['hours-per-week','salary']).size()[1,'>50K'] / num_min_workers * 100 , 1)

    # What country has the highest percentage of people that earn >50K?
    percentage = round (df.groupby(['native-country','salary']).size()[:,'>50K'] / df['native-country'].value_counts()*100 , 1)
    highest_earning_country = percentage.idxmax()
    highest_earning_country_percentage = percentage.max()

    # Identify the most popular occupation for those who earn >50K in India.
    top_IN_occupation = df.groupby(['occupation','native-country']).size()[:,'India'].idxmax()

    # DO NOT MODIFY BELOW THIS LINE

    if print_data:
        print("Number of each race:\n", race_count) 
        print("Average age of men:", average_age_men)
        print(f"Percentage with Bachelors degrees: {percentage_bachelors}%")
        print(f"Percentage with higher education that earn >50K: {higher_education_rich}%")
        print(f"Percentage without higher education that earn >50K: {lower_education_rich}%")
        print(f"Min work time: {min_work_hours} hours/week")
        print(f"Percentage of rich among those who work fewest hours: {rich_percentage}%")
        print("Country with highest percentage of rich:", highest_earning_country)
        print(f"Highest percentage of rich people in country: {highest_earning_country_percentage}%")
        print("Top occupations in India:", top_IN_occupation)

    return {
        'race_count': race_count,
        'average_age_men': average_age_men,
        'percentage_bachelors': percentage_bachelors,
        'higher_education_rich': higher_education_rich,
        'lower_education_rich': lower_education_rich,
        'min_work_hours': min_work_hours,
        'rich_percentage': rich_percentage,
        'highest_earning_country': highest_earning_country,
        'highest_earning_country_percentage':
        highest_earning_country_percentage,
        'top_IN_occupation': top_IN_occupation
    }

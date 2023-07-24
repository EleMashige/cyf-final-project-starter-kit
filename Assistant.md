# Ability to Automate Codility data extraction

* Does codility have an API?  
Yes, there is an API for codility data extraction, the API is published under https://codility.com/api/  and available only over HTTPS, it follows standard HTTP conventions and relies on for JSON data representation.

* is it public? is it free?   
 The API usage is currently 500 request per user per hour. For having a higher limit, it requires to pay money.

* does it have the data we're interested in? (score of a person, link to completed tests, Assigned tests still to complete...) where is the documentation how do we use it.

You can view candidate data for a particular test session using the following endpoint: https://codility.com/api/sessions/<session_id>
The extracted data is included the result candidates score for the task , start_date, close_date, result candidates score for the task, To determine if the test is completed or not, you can check the "start_date" and "close_date" fields in the response.If both "start_date" and "close_date" are not null, it means the test has been completed. The "start_date" indicates when the candidate started the test, and the "close_date" indicates when the candidate finished or closed the test.


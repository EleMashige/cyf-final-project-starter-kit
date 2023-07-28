# Ability to Automate Codility data extraction

* Does codility have an API?  
Yes, there is an API for codility data extraction, the API is published under https://codility.com/api/  and available only over HTTPS, it follows standard HTTP conventions and relies on for JSON data representation.

* is it public? is it free?   
 The API usage is currently 500 request per user per hour. For having a higher limit, it requires to pay money.

* does it have the data we're interested in? (score of a person, link to completed tests, Assigned tests still to complete...) where is the documentation how do we use it.

You can view candidate data for a particular test session using the following endpoint: https://codility.com/api/sessions/<session_id>
The extracted data is included the result candidates score for the task , start_date, close_date, result candidates score for the task, To determine if the test is completed or not, you can check the "start_date" and "close_date" fields in the response.If both "start_date" and "close_date" are not null, it means the test has been completed. The "start_date" indicates when the candidate started the test, and the "close_date" indicates when the candidate finished or closed the test.





Research: Ability to Automate Attendance data extraction:

Is it done on an existing application?  We Check for an existing application that handles attendance tracking.
Is it done on Excel or an online sheet? - Determine if attendance data is stored in Excel or an online spreadsheet.
Is it possible to have API access to it? if there is an API available for programmatically accessing attendance data. If there is no API available for programmatically accessing attendance data, we can still create an application to interact with the data using other methods, If we have access to the PostgreSQL database, we can use libraries like pg-promise, f the attendance data is available on a web page, we can use web scraping libraries like Cheerio, Puppeteer, or axios.

Does it have the data we're interested in (attended lessons and 100% attendance)? - Confirm if the required attendance data is available, including attended lessons and 100% attendance records.
Who owns the document? Who do we ask for access? - Identify the document's owner or responsible person to request access to the attendance data.







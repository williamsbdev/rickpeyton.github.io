---
layout: post
category: ruby
---
## The Database
This cheatsheet post is a quick reference on SQL basics. Ruby on Rails generally shields me from raw SQL, but having some knowledge of what is actually going on under the hood is helpful.

### Common Sequel Statements

* SELECT - extracts data from a database
* UPDATE - updates data in a database
* DELETE - deletes data from a database
* INSERT INTO - inserts new data into a database
* CREATE DATABASE - creates a new database
* ALTER DATABASE - modifies a database
* CREATE TABLE - creates a new table
* ALTER TABLE - modifies a table
* DROP TABLE - deletes a table
* CREATE INDEX - creates an index (search key)
* DROP INDEX - deletes an index

#### SQL *syntax*

    SELECT column_name,column_name
    FROM table_name;
    and
    SELECT * FROM table_name;

The SELECT DISTINCT statement is used to return only distinct (different) values.

    SELECT DISTINCT column_name,column_name
    FROM table_name;

The WHERE clause is used to extract only those records that fulfill a specified criterion.

    SQL WHERE Syntax
    SELECT column_name,column_name
    FROM table_name
    WHERE column_name operator value;

Operators in the WHERE Clause

* = (Equal)
* <> (Not Equal (sometimes != ))
* > (Greater than)
* < (Less than)
* >= (Greater than or equal)
* <= (Less than or equal)
* BETWEEN (Between an inclusive range)
* LIKE (Search for a pattern)
* IN (To specify multiple possible values for a column)
* AND (If both the first condition and the second condition are true)
* OR (If either the first condition or the second condition are true)

The ORDER BY keyword is used to sort the result-set by one or more columns.
The ORDER BY keyword sorts the records in ascending order by default. To sort the records in a descending order, you can use the DESC keyword.

    SELECT column_name,column_name
    FROM table_name
    ORDER BY column_name,column_name ASC|DESC;

The INSERT INTO statement is used to insert new records in a table.

The first form does not specify the column names where the data will be inserted, only their values

    INSERT INTO table_name
    VALUES (value1,value2,value3,...);

The second form specifies both the column names and the values to be inserted (This form allows you to only insert date into certain columns)

    INSERT INTO table_name (column1,column2,column3,...)
    VALUES (value1,value2,value3,...);

The UPDATE statement is used to update existing records in a table.

    UPDATE table_name
    SET column1=value1,column2=value2,...
    WHERE some_column=some_value;

The DELETE statement is used to delete rows in a table.

    DELETE FROM table_name
    WHERE some_column=some_value;

### A bit more advanced syntax

The LIKE operator is used in a WHERE clause to search for a specified pattern in a column.

    SELECT column_name(s)
    FROM table_name
    WHERE column_name LIKE pattern;

Example (where % is a wildcard)

    SELECT * FROM Customers
    WHERE City LIKE 's%';

    SELECT * FROM Customers
    WHERE Country LIKE '%land%';

    SELECT * FROM Customers
    WHERE Country NOT LIKE '%land%';

SQL CREATE TABLE Example

    CREATE TABLE Persons
    (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
    );

SQL constraints:

* NOT NULL - Indicates that a column cannot store NULL value
* UNIQUE - Ensures that each row for a column must have a unique value
* PRIMARY KEY - A combination of a NOT NULL and UNIQUE. Ensures that a column (or combination of two or more columns) have an unique identity which helps to find a particular record in a table more easily and quickly
* FOREIGN KEY - Ensure the referential integrity of the data in one table to match values in another table
* CHECK - Ensures that the value in a column meets a specific condition
* DEFAULT - Specifies a default value when specified none for this column

Altering tables to add constraints
To create a PRIMARY KEY constraint on the "P_Id" column when the table is already created, use the following SQL:

    ALTER TABLE Persons
    ADD PRIMARY KEY (P_Id)

The following SQL creates a FOREIGN KEY on the "P_Id" column when the "Orders" table is created:

    CREATE TABLE Orders
    (
    O_Id int NOT NULL,
    OrderNo int NOT NULL,
    P_Id int,
    PRIMARY KEY (O_Id),
    FOREIGN KEY (P_Id) REFERENCES Persons(P_Id)
    )

To create a FOREIGN KEY constraint on the "P_Id" column when the "Orders" table is already created, use the following SQL:

    ALTER TABLE Orders
    ADD FOREIGN KEY (P_Id)
    REFERENCES Persons(P_Id)

### Be aware of SQL injection

*The only proven way to protect a web site from SQL injection attacks, is to use SQL parameters.
SQL parameters are values that are added to an SQL query at execution time, in a controlled manner.*

*Note that parameters are represented in the SQL statement by a @ marker.
The SQL engine checks each parameter to ensure that it is correct for its column and are treated literally, and not as part of the SQL to be executed.*

    $stmt = $dbh->prepare("INSERT INTO Customers (CustomerName,Address,City) 
    VALUES (:nam, :add, :cit)");
    $stmt->bindParam(':nam', $txtNam);
    $stmt->bindParam(':add', $txtAdd);
    $stmt->bindParam(':cit', $txtCit);
    $stmt->execute();

### Moving on
Once you have mastered the basics of the database try [Learning MySQL](http://www.amazon.com/Learning-MySQL-Seyed-Saied-Tahaghoghi/dp/0596008643/ref=sr_1_1?ie=UTF8&qid=1422724197&sr=8-1&keywords=learning+mysql) to level up.

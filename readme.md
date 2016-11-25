# Employee salary tracker

# Instalation MongoDB
##Ubuntu

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
    echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/testing main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    
##Fedora 24<br>
Create a ` /etc/yum.repos.d/mongodb-org-3.2.repo` file so that you can install MongoDB directly, using yum.

    
    [mongodb-org-3.2]
    name=MongoDB Repository
    baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/3.2/x86_64/
    gpgcheck=0
    enabled=1
    
    sudo dnf install -y mongodb-org
    

##Start/Stop/Restart database

    sudo service mongod start
    sudo service mongod stop
    sudo service mongod restart



## Rest API

### Employee

Employee structure

    {
        _id: number,  -- unique document id
        _v: number,   -- version of document in Mongo
        name: string,
        email: string,
        address: string,
        phone: string
    }

#### `<customerID>/api/employee`
- GET  - get all employees
- POST  - create new employee
- PUT  - bulk update
- DELETE  - delete all employees    

#### `<customerID>/api/employee/<employeeId>`
- GET  - get employee
- PUT  - update if exist
- DELETE  - delete employee
    
    
    
    
### Salary

    {
        _id: number,  -- unique document id
        _v: number,   -- version of document in Mongo
        employeeId: number,
        date: Date,
        salary: number,
    }
    
#### `<customerID>/api/salary/<employeeId>[?options]`
- GET  - get all salaries of employee
    - `dateFrom` - all salaries since date, use `Date.toISOString()`
    - `dateTo` - all salaries until date, use `Date.toISOString()`
- POST  - add new salary
    
#### `<customerID>/api/salary`
- POST - get salaries by query 

    
    {
        employeeIds: string[]
    }
    
- PUT  - update if exist
- DELETE  - delete salary
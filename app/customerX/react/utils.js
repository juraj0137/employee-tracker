import {v4} from 'node-uuid';
/**
 * Created by jkubala on 11/23/16.
 */

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

class EmployeeApi {

    static saveEmployee(employee) {
        return delay(500).then(() => {

            // api call
            employee.id = v4();
            return employee;
        });
    }

    static updateEmployee(employee) {
        return delay(500).then(() => {
            return employee;
        });
    }

    static loadEmployees() {

        return delay(500).then(() => {

            let employees = [];
            for (let i = 0; i < 10; i++) {
                employees.push(generateEmployee())
            }

            return employees;
        });
    }

    static deleteEmployee(employee) {
        return delay(500).then(() => {
            return employee;
        });
    }
}

class SalaryApi {

    static salaries = []

    static loadSalariesByEmployeeIds(ids, options = {}) {

        return delay(500).then(() => {

            if (this.salaries.length == 0)
                ids.forEach(id => {
                    for (let i = 0; i < 11; i++) {
                        this.salaries.push(generateSalary(id, i));
                    }
                });

            return this.salaries.filter(salary => {

                if (options.dateFrom instanceof Date && salary.date < options.dateFrom)
                    return false;

                if (options.dateTo instanceof Date && salary.date >= options.dateTo)
                    return false;

                return true;
            });
        });
    }


    static saveSalary(salary) {
        return delay(500).then(() => {

            // api call
            salary.id = v4();
            return salary;
        });
    }

    static updateSalary(salary) {
        return delay(500).then(() => {
            // api call
            return salary;
        });
    }
}

export {
    EmployeeApi,
    SalaryApi,
}

const generateSalary = (employeeId, month = 0) => {
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const date = new Date();
    date.setMonth(date.getMonth() - month);
    return {
        id: v4(),
        employeeId: employeeId,
        salary: Math.floor(Math.random() * 1000) + 1500,
        date: date
    }
};

const generateEmployee = () => {
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    return {
        id: v4(),
        name: rand(names),
        phone: rand(phones),
        address: rand(addresses),
        email: rand(emails)
    }
}

const names = [
    "Lillian Allen",
    "Matthew Gibson",
    "Roy Fowler",
    "Norma Oliver",
    "Joe Hudson",
    "Joshua Hudson",
    "Todd Black",
    "Peter Taylor",
    "Todd Garcia",
    "Sarah Nelson",
    "Walter Perez",
    "Thomas Lee",
    "Jimmy Stone",
    "Mary Taylor",
    "Eugene Hawkins",
    "Christopher Reid",
    "Bonnie Boyd",
    "Sandra Hill",
    "Margaret King",
    "Gregory Ryan",
];

const emails = [
    "rgarcia0@rediff.com",
    "jbrown1@reuters.com",
    "slawson2@zdnet.com",
    "lryan3@blinklist.com",
    "adean4@hostgator.com",
    "dgarza5@weibo.com",
    "trogers6@usa.gov",
    "kfernandez7@upenn.edu",
    "plittle8@seesaa.net",
    "larnold9@ebay.co.uk",
    "cpetersona@php.net",
    "jsullivanb@opera.com",
    "kcampbellc@ehow.com",
    "smeyerd@slideshare.net",
    "tgardnere@networksolutions.com",
    "myoungf@ihg.com",
    "pcarrollg@goo.ne.jp",
    "ehenryh@netlog.com",
    "wfosteri@adobe.com",
    "fbaileyj@surveymonkey.com",
];

const addresses = [
    "5 Elgar Circle",
    "69751 Debs Point",
    "57 Anzinger Plaza",
    "2 Hayes Hill",
    "2310 Vidon Point",
    "3 Jackson Place",
    "46 Miller Parkway",
    "42 Prairie Rose Street",
    "10 Milwaukee Place",
    "886 Hauk Hill",
    "9276 Butterfield Drive",
    "42 Lake View Lane",
    "8 Prentice Road",
    "18362 Brentwood Plaza",
    "42109 Pine View Alley",
    "85732 Cambridge Crossing",
    "29232 Dunning Alley",
    "0 Graedel Court",
    "84 Anzinger Court",
    "2 Spaight Court",
];

const phones = [
    "93-(537)123-1968",
    "62-(160)635-1789",
    "33-(227)346-2911",
    "62-(766)229-7757",
    "63-(726)412-1955",
    "48-(535)533-4546",
    "504-(182)914-1828",
    "267-(620)913-7901",
    "51-(127)866-2286",
    "374-(462)971-9280",
    "86-(319)994-2111",
    "51-(819)184-0098",
    "55-(218)539-5439",
    "64-(331)410-1442",
    "55-(662)951-6185",
    "86-(901)162-9611",
    "46-(230)779-0638",
    "33-(851)978-4623",
    "62-(419)413-2897",
    "86-(149)303-8000",
]
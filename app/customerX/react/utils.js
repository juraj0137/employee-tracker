import {v4} from 'node-uuid';
/**
 * Created by jkubala on 11/23/16.
 */

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export class Api {

    static saveEmployee(values) {
        return delay(500).then(() => {

            // api call
            values.id = v4();
            return values;
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
            for (let i = 0; i < 20; i++) {
                employees.push({
                    id: v4(),
                    name: 'Uzasne meno',
                    phone: '+4216598494',
                    address: 'Brmbolkovo 23',
                    email: 'uzasny@email.com'
                })
            }

            return employees;
        });
    }
}
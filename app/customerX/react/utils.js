import {v4} from 'node-uuid';
/**
 * Created by jkubala on 11/23/16.
 */

export class Api {

    static saveEmployee(values) {
        return new Promise((resolve, reject) => {
            // api call

            resolve(values);
        });
    }

    static loadEmployees() {
        return new Promise((resolve, reject) => {

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

            resolve(employees);
        });
    }
}
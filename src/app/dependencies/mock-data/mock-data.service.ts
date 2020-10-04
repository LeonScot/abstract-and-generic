import { Injectable } from '@angular/core';
import { mocker } from 'mocker-data-generator';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  public init(): void {
    const user = {
      firstName: {
          faker: 'name.firstName'
      },
      lastName: {
          faker: 'name.lastName'
      },
      country: {
          faker: 'address.country'
      },
      createdAt: {
          faker: 'date.past'
      },
      username: {
          function(): void {
              return (
                  this.object.lastName.substring(0, 5) +
                  this.object.firstName.substring(0, 3) +
                  Math.floor(Math.random() * 10)
              );
          }
      }
    };
    const group = {
      description: {
          faker: 'lorem.paragraph'
      },
      users: [
          {
              function(): void {
                  return this.faker.random.arrayElement(this.db.user).username;
              },
              length: 10,
              fixedLength: false
          }
      ]
    };
    const conditionalField = {
      type: {
          values: ['HOUSE', 'CAR', 'MOTORBIKE']
      },
      'object.type=="HOUSE",location': {
          faker: 'address.city'
      },
      'object.type=="CAR"||object.type=="MOTORBIKE",speed': {
          faker: 'random.number'
      }
    };

  // Using traditional callback Style

    mocker()
      .schema('user', user, 2)
      .schema('group', group, 2)
      .schema('conditionalField', conditionalField, 2)
      .build((error, data) => {
          if (error) {
              throw error;
          }
          console.log('1', data);

          // This returns an object
          // {
          //      user:[array of users],
          //      group: [array of groups],
          //      conditionalField: [array of conditionalFields]
          // }
      });

  // Using promises

    mocker()
      .schema('user', user, 2)
      .schema('group', group, 2)
      .schema('conditionalField', conditionalField, 2)
      .build()
      .then(
          data => {
              console.log('2', data);
              // This returns an object
              // {
              //      user:[array of users],
              //      group: [array of groups],
              //      conditionalField: [array of conditionalFields]
              // }
          },
          err => console.error(err)
      );

  // Synchronously

  // This returns an object
  // {
  //      user:[array of users],
  //      group: [array of groups],
  //      conditionalField: [array of conditionalFields]
  // }
    const dataLog = mocker()
      .schema('user', user, 2)
      .schema('group', group, 2)
      .schema('conditionalField', conditionalField, 2)
      .buildSync();

    console.log('3', dataLog);

  }

  public fakeField(): void {
    const cultivation = {
      id: {
        incrementalId: 1
      },
      name: {
          faker: 'name.jobTitle'
      },
    };


    const field = {
      id: {
        incrementalId: 1
      },
      name: {
          faker: 'name.title'
      },
      cultivations: [
        {
          faker: 'random.arrayElement(db.cultivation)',

          // Array config
          length: 10,
          fixedLength: false,
        }
      ]
    };

    mocker()
    .schema('field', field, 2)
    .schema('cultivation', cultivation, 20)
    .build((error, data) => {
        if (error) {
            throw error;
        }
        console.log('1', data);
    });
  }

  public fieldOwnData(): any {
    const field = {
      id: 1,
      name: 'Field 1',
      cultivations: []
    };

    for (let index = 0; index < 4; index++) {
      field.cultivations.push({
        id: index + 1,
        name: `Cultivation ${index + 1}`,
        phases: []
      });

      for (let index2 = 0; index2 < 10; index2++) {

        const randStart = Math.ceil(Math.random() * 10);
        const randEnd = Math.ceil(Math.random() * 5);

        const mockStart = new Date();
        mockStart.setDate(mockStart.getDate() - randStart);

        const mockEnd = new Date(mockStart);
        mockEnd.setDate(mockEnd.getDate() + randEnd);

        const ranColor = `#${Math.random().toString(16).substr(-6)}`;

        field.cultivations[index].phases.push({
          id: index2 + 1,
          name: `Activity ${index2 + 1}`,
          color: ranColor,
          startDate: mockStart,
          completionDate: mockEnd,
        });
      }
    }
    return field;
  }
}

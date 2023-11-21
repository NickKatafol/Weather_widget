export const taskText = `
<b>Frontend developer demo</b>
Implement a widget that displays the weather.

<span style="color: var(--vt-c-fiolet);">\# Technologies:</span>
Vue.js - 3, 
Pinia, 

Vuelidate,
This project implements passive validation via Vuelidate.
An example of the use of preventive validation is implemented with the Nuxt.js demo project, 
https://github.com/GreatGameNick/Exchange_calculator.git

Domain Driven Design,
TypeScript,
Object Oriented Programming,
class,
Test Driven Design,
SOLID, 
minor dev rules,

ES7+, 
SCSS, grid, flexbox,

Vitest (unit testing), 
Cypress (e2e testing).

<span style="color: var(--vt-c-fiolet);">\# Conditions:</span>
1. Data for the widget taken from free public API: 
https://openweathermap.org/current,
via ohmyfetch through <b>apiService module</b>.

2. <b>API errors</b> is handlered with a message:
- entering wrong city name while pointing weather location

3. After clicking the ‘Gear’ button at the upper-right corner, the view switch to the following:

Here, a user be able to:
a. Remove previously added location.
b. Reorder the location by <b>dragging and dropping</b> them within the list.
c. Add new locations.
There is a <b>validation</b> with number within certain interval allowing negative numbers.

4. Save the configuration in the <b>local storage</b> and restore it on future visits. A user is be able
to configure the widget just once and then have the same view until they change the computer
or clean the storage.

5. If the local storage is empty it take current <b>geolocation</b> coordinates.

6. Use the <b>universal applicable vue component</b> - '@/components/gridCard/GridCard.vue'.

7. Make a bunch of tests where <b>unit</b> and <b>e2e tests</b> cover code with <b>Vitest</b> and <b>Cypress.io</b>.
Unit tests include:
- Render component with props, child components, mocking Pinia,
- Click & Router Test - Check the Router.push work out when cross-button click,
- Exported function Testing, test is inside of JS file,
- Pinia Testing - testing actions, setters and getters,
- Testing static methods of class,
- as examples it is probably enough.

E2E tests include:
- routing between pages,
- examine a bunch of business processes.

<span style="color: var(--vt-c-fiolet);"># Notes:</span>
KEEP IN MIND
There is not the production issue. 
First at all it's just demonstration the developer style end some skills.
It is possible to expand and deepen the presented backbone in a multifaceted and elaborate way.

For example there is no objective to cover code with tests tremendously. I only point to my useful skills about it.
`
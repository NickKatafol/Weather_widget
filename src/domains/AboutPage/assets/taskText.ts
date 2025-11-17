export const taskText = `
<span style="color: var(--vt-c-fiolet);">\# Technologies:</span>

Vue.js v3
Pinia

Vuelidate
Drag-and-Drop
Composabiles

Domain Driven Design
Object Oriented Programming
SOLID
Minor dev rules
Test Driven Design
TypeScript
ES6 class

ES7+
SCSS, grid, flexbox
BEM

Vitest (unit testing)
Cypress (e2e testing)

<span style="color: var(--vt-c-fiolet);">\# Conditions:</span>
1. Data for the widget is taken from the free public API: 
https://openweathermap.org/current,
via ohmyfetch through <b>apiService module</b>.

2. <b>API errors</b> is handled with a message:
- entering the wrong city name while pointing a weather location.

3. After clicking the <b>‘Gear’ button</b> at the upper-right corner, the view get switched to the following:

A user be able to:
a/ Add a new location.
- There is a <b>validation</b> by a number applied.
b/ Remove the location.
c/ Reorder the locations by <b>dragging and dropping</b>.

4. Save the configuration in the <b>Local Storage</b> and restore it while future visits. A user is be able to configure the widget just once and then have the same view until hi change the computer or clean the Lockal Storage out.

5. If the local storage is empty it takes the current <b>geolocation</b> coordinates.


6. Unit tests:

- Render component with props, child components, mocking Pinia,
- Click & Router Test - Check out the Router.push work when you click the cross-button,
- Exported function Testing, the test is inside of the same JS file,
- Pinia Testing - testing the actions, setters and getters,
- Testing static methods of ES6 class

7. E2E tests:

- routing between pages,
- exam a bunch of the business processes.

`
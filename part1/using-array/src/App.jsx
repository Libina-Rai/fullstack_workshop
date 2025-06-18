import SayHello from './SayHello';


let App = () => {
  let peopleArray = [
                  {firstName: "john", lastName: "rai", id: 2},
                  {firstName: "jane", lastName: "doe", id: 4},
                  {firstName: "jack", lastName: "smith", id: 5}
                  ];

return peopleArray.filter(person => person.id > 3)
.map((value) => <SayHello person={value} key={value.id} />);

// if(peopleArray.length > 0){
//   return (
//     <div> 
//       {peopleArray.map((value => 
//       <SayHello 
//         person={value} 
//         key={value.id}
//       />))}
//       {/* <SayHello
//         firstName={peopleArray[0].firstName} 
//         lastName={peopleArray[0].lastName}/>
//        <SayHello 
//         firstName={peopleArray[2].firstName} 
//         number={peopleArray[1].id} /> */}
//     </div>
//   );
// }
// return (
//   <h1>There is no data</h1>
// )

//USING TERNARY OPERATOR
  // return peopleArray.length > 0 ? (
  //       <div> 
  //         {peopleArray.map((value) => (
  //           <SayHello 
  //             person={value} 
  //             key={value.id}
  //           />
  //         ))}
  //       </div>
  //     ) : (
  //       <h1>There is no data</h1>
  //     )}
  
};

export default App;
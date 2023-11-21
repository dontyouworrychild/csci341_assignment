// import { createContext, useContext, useEffect, useState } from 'react';

// const UserContext = createContext();

// const isAuthenticated = () => {
// 	const user = localStorage.getItem('user');
// 	if (!user) {
// 		return {}
// 	}
//     console.log('in localstorage', user);
// 	return JSON.parse(user);
// };

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState();

//   useEffect = (() => {
//     const checkLoggedIn = () => {
//         let current_user = isAuthenticated();
//         if (current_user == null) {
//             localStorage.setItem('user', '');
//             current_user = '';
//         }
//         setCurrentUser(current_user);
//     };
//     checkLoggedIn();
//   }, [])

//   console.log('userContext', currentUser);

//   return (
//     <UserContext.Provider value={[ currentUser, setCurrentUser ]}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;

// export const useUser = () => {
//   return useContext(UserContext);
// };
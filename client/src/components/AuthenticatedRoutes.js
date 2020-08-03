// import React from "react";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// export default function AuthenticatedRoute({
//   component: C,
//   appProps,
//   ...rest
// }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         appProps.username ? (
//           <C {...props} {...appProps} />
//         ) : (
//           <Redirect
//             to={`/signin?redirect=${props.location.pathname}${props.location.search}`}
//           />
//         )
//       }
//     />
//   );
// }

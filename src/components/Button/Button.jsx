// import React, { Component } from "react";
// import { ButtonLoadMore } from "./Button.styled";

// class Button extends Component {
//   render() {
//     const { onLoadMore, isDisabledLoadMoreBtn } = this.props;
//     return (
//       <ButtonLoadMore
//         type="button"
//         onClick={onLoadMore}
//         disabled={isDisabledLoadMoreBtn}>
//         Load More
//       </ButtonLoadMore>
//     );
//   }
// }

// export default Button;

// * Як класовий компонент
// import React, { Component, forwardRef } from "react";
// import { ButtonLoadMore } from "./Button.styled";

// class Button extends Component {
//   render() {
//     const { onLoadMore, isDisabledLoadMoreBtn, forwardedRef } = this.props;
//     return (
//       <ButtonLoadMore
//         type="button"
//         onClick={onLoadMore}
//         disabled={isDisabledLoadMoreBtn}
//         ref={forwardedRef}>
//         Load More
//       </ButtonLoadMore>
//     );
//   }
// }

// // Обгортка класового компонента Button з forwardRef
// const ButtonWithRef = forwardRef((props, ref) => (
//   <Button {...props} forwardedRef={ref} />
// ));

// export default ButtonWithRef;

// * Як функціональний компонент
import React, { forwardRef } from "react";
import { ButtonLoadMore } from "./Button.styled";

const Button = forwardRef(({ onLoadMore, isDisabledLoadMoreBtn }, ref) => (
  <ButtonLoadMore
    type="button"
    onClick={onLoadMore}
    disabled={isDisabledLoadMoreBtn}
    ref={ref} // Передаємо ref
  >
    Load More
  </ButtonLoadMore>
));

export default Button;

import React from "react";

const Item = React.memo(props => {
  const item = props.item;
  return (
    <li>{item}</li>
  );
});
export default Item;

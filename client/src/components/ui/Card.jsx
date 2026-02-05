const Card = ({ as: Component = "div", className = "", children, ...props }) => {
  const classes = ["ui-card", className].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Card;

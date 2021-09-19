import React from "react";
import Link from "next/Link";

interface ButtonProps {
  label: string;
  url: string;
}

const Button = ({ url, label }: ButtonProps) => {
  const styles: React.CSSProperties = {
    display: "inline-block",
    background: "#808080",
    padding: "5px 20px",
    color: "#FFF",
    borderRight: "4px solid #333",
    borderBottom: "4px solid #333",
  };

  return <Link href={url}><a className="button" style={styles}>{label}</a></Link>;
};

export default Button;
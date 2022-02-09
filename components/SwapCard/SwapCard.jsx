import React, { useState } from "react";
import { Button, Icon, Input, Label } from "semantic-ui-react";
import styles from "./SwapCard.module.css";

const SwapCard = () => {
  const tokens = {
    ethereum: {
      name: "ETH",
      logoPath: "/ethereum-logo.png",
    },
    faroukcoin: {
      name: "FRKC",
      logoPath: "/coin-logo.png",
    },
  };

  const [soldToken, setSoldToken] = useState(tokens["ethereum"]);
  const [boughtToken, setBoughtToken] = useState(tokens["faroukcoin"]);

  const switchTokens = () => {
    const tmp = soldToken;
    setSoldToken(boughtToken);
    setBoughtToken(tmp);
  };

  return (
    <div className={styles.swapContainer}>
      <Label basic image size="large" className={styles.tokenLabel}>
        <img src={soldToken.logoPath} />
        {soldToken.name}
      </Label>
      <Input />
      <Icon
        circular
        size="large"
        name="exchange"
        className={styles.switchButton}
        onClick={switchTokens}
      />
      <Label basic image size="large" className={styles.tokenLabel}>
        <img src={boughtToken.logoPath} />
        {boughtToken.name}
      </Label>
      <Input />
      <Button primary className={styles.swapButton}>
        Swap
      </Button>
    </div>
  );
};

export default SwapCard;

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
  const [soldAmount, setSoldAmount] = useState("");
  const [boughtToken, setBoughtToken] = useState(tokens["faroukcoin"]);
  const [boughtAmount, setBoughtAmount] = useState("");

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
      <Input
        type="number"
        min="0"
        placeholder="0.0"
        value={soldAmount}
        onChange={(e) => setSoldAmount(e.target.value)}
      />
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
      <Input
        type="number"
        min="0"
        placeholder="0.0"
        value={boughtAmount}
        onChange={(e) => setBoughtAmount(e.target.value)}
      />
      <Button primary className={styles.swapButton}>
        Swap
      </Button>
    </div>
  );
};

export default SwapCard;

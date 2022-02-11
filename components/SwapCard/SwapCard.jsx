import React, { useEffect, useState } from "react";
import { Button, Icon, Input, Label } from "semantic-ui-react";
import fromExponential from "from-exponential";
import faroukswap from "../../ethereum/faroukswap";
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
  const [conversionRate, setConversionRate] = useState(null);

  useEffect(async () => {
    setConversionRate(await faroukswap.methods.conversionRate().call());
  }, []);

  const switchTokens = () => {
    const tmp = soldToken;
    setSoldToken(boughtToken);
    setBoughtToken(tmp);
  };

  const updateAmounts = (e) => {
    const formattedBoughtAmount = fromExponential(
      e.target.value * conversionRate
    );

    setSoldAmount(e.target.value);
    setBoughtAmount(formattedBoughtAmount);
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
        onChange={updateAmounts}
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
        disabled
        value={boughtAmount}
        className={styles.boughtTokenInput}
        onChange={(e) => setBoughtAmount(e.target.value)}
      />
      <p>Conversion rate: 1 ETH = {1 * conversionRate} FRKC</p>
      <Button primary className={styles.swapButton}>
        Swap
      </Button>
    </div>
  );
};

export default SwapCard;

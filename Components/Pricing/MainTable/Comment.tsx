import Link from "next/link";
import { usePricingContext } from "../context";
import styled from "styled-components";
import MultiCurrencyFormat from "../../MultiCurrencyFormat";
import { FunctionComponent } from "react";

import { useTranslation } from "react-i18next";

const CommentStyled = styled.div`
  display: flex;
  .yearly {
    display: flex;
    margin-right: 5px;
    .yearlyAmount {
      margin-right: 3px;
    }
  }
`;

const AskInquiry = styled.a`
  outline: none;
  background: transparent;
  border: none;
  text-decoration: underline;
  cursor: pointer;
`;

type YProps = {
  period: number;
  yearlyPrice: number;
};
const Yearly: FunctionComponent<YProps> = ({ period, yearlyPrice }) => {
  const { t, i18n } = useTranslation("pricing");
  if (period) {
    return (
      <span className={"yearly"}>
        <span className={"yearlyAmount"}>
          <MultiCurrencyFormat value={yearlyPrice} currency="usd" />
        </span>
        <span>yearly.</span>
      </span>
    );
  }
  return null;
};

type Props = {
  plan: number;
};

const Comment: FunctionComponent<Props> = ({ plan }) => {
  const {
    plans,
    period,
    recommendedPlan,
    freeEmployees,
    employees,
    maxEmployeesOnSlider,
  } = usePricingContext();
  const { t, i18n } = useTranslation("pricing");
  const planData = plans[plan];
  const { yearlyPrice } = planData;

  if (plan === 0) {
    return (
      <CommentStyled>
        <div>
          {t("maximum")} <strong>{freeEmployees}</strong> {t("employees")}
        </div>
      </CommentStyled>
    );
  }

  if (plan === 1 || plan === 2) {
    if (employees === maxEmployeesOnSlider) {
      return (
        <CommentStyled>
          <Link href="/ask" passHref>
            <AskInquiry>{t("inquiry")}</AskInquiry>
          </Link>
        </CommentStyled>
      );
    }
    return (
      <CommentStyled>
        <Yearly yearlyPrice={yearlyPrice} period={period} />
        <div>
          {t("upTo")} <strong>{employees}</strong> {t("employees")}.
        </div>
      </CommentStyled>
    );
  }
  return null;
};

export default Comment;

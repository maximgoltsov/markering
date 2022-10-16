import React, { useEffect, useRef, useState } from "react";
import Modal from "../../shared/ui/Modal";
import VkSvg from "../../assets/img/vk.svg";
import OkSvg from "../../assets/img/ok.svg";
import TwSvg from "../../assets/img/tw.svg";
import FacebookSvg from "../../assets/img/facebook.svg";

import "./MarketingForm.scss";
import { useFormStore } from "../../entities/form/models/formStore";
import classNames from "classnames";
import { z } from "zod";
import SuccessMessage from "../SuccessMessage/SuccessMessage";

enum SOCIALS {
  vk = "Вконтакте",
  ok = "Одноклассники",
  twitter = "Twitter",
  facebook = "Facebook",
}

const MarketingForm: React.FC = () => {
  const [selectedSocial, setSelectedSocial] = useState<SOCIALS>();
  const { user, getUser, updateUser } = useFormStore();

  const [isEmailValid, setIsEmailValid] = useState(!!user.email);

  const isValidForm = isEmailValid && user.shared;

  const mailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { success } = z.string().email().safeParse(event.currentTarget.value);
    setIsEmailValid(success);

    return event;
  };

  const shareSocial = (social: SOCIALS) => {
    if (!user.shared) {
      updateUser({ ...user, shared: true });
      setSelectedSocial(social);
    }
  };

  const submitForm = () => {
    if (mailRef.current) {
      updateUser({ ...user, email: mailRef.current.value });
    }
  };

  if (user.shared && !!user.email) {
    return <SuccessMessage />;
  }

  return (
    <>
      <div className="form">
        <div className="form_titleContainer">
          <span className="form_title">Чтобы выиграть путешествие</span>
        </div>
        <div className="form_step">
          <div className="form_stepContainer">
            <div className="form_stepCount">
              {user.shared && (
                <input type="checkbox" className="checkbox" checked readOnly />
              )}
              {!user.shared && "1."}
            </div>
            <div className="form_stepLabel">Поделись с друзьями:</div>
          </div>
          <div className="form_stepContent">
            <div className="form_socialBlock">
              <div
                className={classNames({
                  form_social: !user.shared,
                  "form_social-inactive": user.shared,
                })}
                onClick={() => shareSocial(SOCIALS.vk)}
              >
                <img src={VkSvg} />
              </div>
              <div
                className={classNames({
                  form_social: !user.shared,
                  "form_social-inactive": user.shared,
                })}
                onClick={() => shareSocial(SOCIALS.facebook)}
              >
                <img src={FacebookSvg} />
              </div>
              <div
                className={classNames({
                  form_social: !user.shared,
                  "form_social-inactive": user.shared,
                })}
                onClick={() => shareSocial(SOCIALS.twitter)}
              >
                <img src={TwSvg} />
              </div>
              <div
                className={classNames({
                  form_social: !user.shared,
                  "form_social-inactive": user.shared,
                })}
                onClick={() => shareSocial(SOCIALS.ok)}
              >
                <img src={OkSvg} />
              </div>
            </div>
          </div>
        </div>
        <div className="form_step">
          <div className="form_stepContainer">
            <div className="form_stepCount">
              {!!user.email && (
                <input type="checkbox" className="checkbox" checked readOnly />
              )}
              {!user.email && "2."}
            </div>
            <div className="form_stepLabel">Оставь почту:</div>
          </div>
          <div className="form_stepContent">
            <input
              value={user.email !== "" ? user.email : undefined}
              ref={mailRef}
              onChange={handleInputChange}
              className="form_input"
              type="text"
              disabled={!!user.email}
            />
          </div>
        </div>
        <div className="form_submitContainer">
          <button
            onClick={submitForm}
            className="customButton"
            disabled={!isValidForm}
            type="submit"
          >
            Отправить
          </button>
        </div>
      </div>
      <Modal
        isOpened={!!selectedSocial}
        onClose={() => setSelectedSocial(undefined)}
      >
        {selectedSocial?.toString()}
      </Modal>
    </>
  );
};

export default MarketingForm;

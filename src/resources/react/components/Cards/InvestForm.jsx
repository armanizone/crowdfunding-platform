import { Button } from "@mantine/core";
import { format } from "date-fns";
import React from 'react'

import {styles} from "./RewardForm"

import { ru } from "date-fns/locale"
import { Link } from "react-router-dom";

function InvestForm({reward, payment, handleModal, donation}) {

  const rewardImage = e => {
    return (
      reward?.image 
        ? <img className={styles.img} src={reward?.image ?? imgUrl}/> 
        : 
          payment?.project?.image 
          ? <img src={`${process.env.MIX_APP_URL}${payment?.project?.image }`} alt="" />
          : <div className={styles.imgFill}></div>
    )
  }

  return (
    <div className={`${styles.reward}`}>
      <div>
        {rewardImage()}
      </div>
      <div className={styles.body}>
        <div className="max-h-[180px] flex-grow">
          <div className={styles.title}>
            <span>{reward?.name}</span>
          </div>
          
          <div className={styles.shortDescription}>
            <span>{reward?.description}</span>
          </div>
        </div>
      {(reward?.send == 1 || reward?.take_city || reward?.letter == 1) && (
        <div className="flex flex-col">
          <span className={styles.typeLabel}>способы получения</span>
          <span className={styles.type}>
            {reward?.send == 1 && reward?.take_city &&"доставка, самовывоз"}
            {reward?.send == 1 && !reward?.take_city &&"доставка"}
            {reward?.send == 0 && reward?.take_city &&"самовывоз"}
            {reward?.letter == 1 && " письмо"}
          </span>
        </div>
      )}
      {reward?.date_sending && (
        <div className="flex flex-col mt-4">
          <span className={styles.typeLabel}>
            Дата отправки
          </span>
          <span className={styles.type}>
            {reward?.date_sending && format(Date.parse(reward?.date_sending), 'PPPP', {locale: ru})}
          </span>
        </div>
      )}
        <div className="flex justify-between items-end mt-3">
          <div className="flex flex-col">
            <span className={styles.cost}>{payment?.sum} ед.</span>   
          </div>
          {!donation && (
            <div className="flex flex-col">
              <span className={styles.count}>{payment?.count}</span>
              <span className="text-xs">приобретено</span>
            </div>
          )}
          {donation && (
                <div className="flex flex-col items-end">
                <span className="text-xs">дата пожертвования</span>
                <span className={styles.count}>{format(Date.parse(payment?.created_at), 'PP', {locale: ru})}</span>
              </div>
          )}
        </div>
        {!donation && (
          <div className={styles.buttonContainer}>
            {payment?.project?.confirmed === 0 && (
              <div className="flex">
                <Button className="text-sm mr-4" fullWidth color="red" variant="outline" onClick={e => handleModal("info", true, payment)} >
                  Детали
                </Button>
                <Button className="text-sm ml-auto" variant="outline" onClick={e => handleModal("delete", true, payment)} >
                  Отмена
                </Button>
              </div>
            )}
            {payment?.project?.confirmed === 1 && (
              <div>
                <Button fullWidth className="text-sm" color="red" variant="outline" onClick={e => handleModal("info", true, payment)} >
                  Детали
                </Button>
              </div>
            )}
            {payment?.project?.confirmed === 2 && (
              <div></div>
            )}
          </div>
        ) }
      </div>
    </div>
  )
}

export default InvestForm
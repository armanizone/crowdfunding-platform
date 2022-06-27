import React, {useState, useEffect} from 'react'
import { ActionIcon, Button, Collapse, Modal, NumberInput } from "@mantine/core";
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { format } from "date-fns";
import { ru } from "date-fns/locale"
import Storage from "../../service/Storage";

export const styles = {
  reward: 'w-80 shadow-md h-full rounded-md flex mx-auto overflow-hidden flex-col relative font-body hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 fade',
  img: 'object-video w-full max-h-[300px]',
  imgFill: 'aspect-video w-full h-full bg-blue-400',
  body: 'px-5 py-4 flex-grow flex flex-col',
  title: 'text-lg leading-5 font-semibold font-head max-h-10 overflow-hidden',
  shortDescription: 'text-sm max-h-[120px] overflow-hidden flex-grow mt-2 mb-4 flex-grow',
  cost: 'text-2xl font-medium font-head leading-5',
  count: 'text-sm font-medium font-body text-right',
  typeLabel: 'text-[11px] tracking-tight text-slate-600 uppercase',
  type: 'text-[11px] tracking-tighter uppercase',
  dateSending: 'mr-2',
  buttonContainer: 'mt-6'
}

function RewardForm({reward, edit, editReward, deleteReward, project,  selected, handleSelected, preview, buy}) {

  const imgUrl = `${process.env.MIX_APP_URL}${reward?.image}`

  const rewardImage = e => {
    return (
      reward?.image 
        ? <img className={styles.img} src={reward?.image ?? imgUrl}/> 
        : <div className={styles.imgFill}></div>
    )
  }

  const user = Storage.get('user')

  const [rewardCount, setRewardCount] = React.useState(1)
  const [rewardCost, setRewardCost] = React.useState(reward?.cost * rewardCount)

  const increment = e => {
    if (rewardCount <= (reward?.total - reward?.bought)) setRewardCount(rewardCount + 1)
  }
  const decrement = e => {
    if (rewardCount > 1) setRewardCount(rewardCount - 1)
  }
    
  React.useEffect(e => {
    setRewardCost(reward.cost * rewardCount)
  }, [rewardCount])

  return (
    <div className={styles.reward}>
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

        {edit && (
          <>
            <RewardBody reward={reward}/>    
            <RewardActions 
              reward={reward} 
              project={project} 
              handleSelected={handleSelected}
              editReward={editReward} 
              deleteReward={deleteReward} 
              edit={edit}
            />
          </>
        )}
        {preview && (
          <>
            <RewardBody reward={reward}/>    
            <RewardActions 
              reward={reward} 
              project={project} 
              handleSelected={handleSelected}
              editReward={editReward} 
              deleteReward={deleteReward} 
              edit={edit}
            />
          </>
        )}
        {buy && (
          <>
            <Collapse in={selected?.id == reward?.id}>
              <RewardPayment 
                reward={reward} 
                increment={increment} 
                decrement={decrement} 
                rewardCount={rewardCount}
                rewardCost={rewardCost} 
              />
            </Collapse>
            <Collapse in={selected && selected?.id != reward?.id}>
              <RewardBody reward={reward}/>    
              <RewardActions 
                reward={reward} 
                project={project} 
                handleSelected={handleSelected}
                editReward={editReward} 
                deleteReward={deleteReward} 
                edit={edit}
              />
            </Collapse>
          </>
        )}
      </div>
    </div> 
  )
}

const RewardPayment = ({reward, decrement, increment, rewardCount, rewardCost}) => {
  return (
    <>
      <div className="flex border border-slate-500 w-full">
        <ActionIcon size={42} onClick={decrement} variant="outline" className="text-xl border-0 border-r">
          <AiOutlineMinus/>
        </ActionIcon>
        <NumberInput
          value={rewardCost}
          variant="unstyled"
          // precision={3}
          classNames={{
            input: 'text-center'
          }}
          className="w-full"
        >
        </NumberInput>
        <ActionIcon size={42} onClick={increment} variant="outline" className="text-xl border-0 border-l">
          <AiOutlinePlus/>
        </ActionIcon>
      </div>
      {reward?.date_sending && (
        <div className="flex flex-col mt-4">
          <span className={styles.typeLabel}>
            Дата отправки
          </span>
          <span className={styles.type}>
            {reward?.date_sending &&  format(Date.parse(reward?.date_sending), 'PPPP', {locale: ru})}
          </span>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <Button 
          className="text-xs uppercase" 
          variant="outline" 
          component={Link} 
          to={`/payment/${reward?.id}/${reward?.project_id}/${rewardCount}`} 
        >
          Приобрести {rewardCount} шт.
        </Button>
      </div>
    </>
  )
}

const RewardBody = ({reward}) => {
  return (
    <>
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
      <div className="flex justify-between items-end mt-3">
          <div className="flex flex-col">
            {reward?.cost && (
              <span className={styles.cost}>{reward?.cost} ед.</span>   
            )}
          </div>
          {reward?.total && (
            <div className="flex flex-col">
              <span className={styles.count}>{reward?.bought ?? 0}/{reward?.total}</span>
              <span className="text-xs">приобретено</span>
            </div>
          )}
      </div>  
    </>
  )
}

const RewardActions = ({project, reward, handleSelected, editReward, deleteReward, edit}) => {

  return (
    <div className={styles.buttonContainer}>
      {edit ?
          <div className="flex justify-between items-center" >
            {(project?.confirmed == 0 && reward?.bought == 0) && (
              <Button
                variant="outline"
                className="uppercase text-xs"
                onClick={e => editReward(reward)}
              >
                редактировать
              </Button>
            )}
            <Button
              variant="outline"
              className="uppercase text-xs"
              onClick={e => deleteReward(reward)}
              color="red"
            >
              удалить
            </Button>
          </div>
        :
          <Button fullWidth className="text-xs uppercase tracking-wider" color="red" onClick={e => handleSelected && reward?.bought <= reward?.total ? handleSelected(reward, true) : console.log()}>
            {reward?.bought >= reward?.total ? "Вознаграждения закончились" : "Приобрести"}
          </Button>
      }
    </div>
  )
}

export default RewardForm


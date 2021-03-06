import React from "react";
import { Link } from 'react-router-dom';

import { CgDanger } from 'react-icons/cg'
import { FaArrowLeft } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import MainService from "../../service/MainService";
import RoleService from "../../service/RoleService";
import { Button, Checkbox, CheckboxGroup, Col, Collapse, LoadingOverlay, Modal, NumberInput, Textarea, TextInput, Tooltip } from "@mantine/core";
import { Calendar, DatePicker, DatePickerBase } from '@mantine/dates'
import 'dayjs/locale/ru';

import { styles } from "../../routes/EditProject";
import { useDebouncedValue, useForceUpdate } from "@mantine/hooks";
import { RewardForm } from "../../components";
import { format } from "date-fns";
import HttpService from "../../service/HttpService";

import Notify from "../../service/Notify";

function Reward ({rewards, id, raw, posted, setRewards, project}) {

  const {success, error, info} = Notify()

  const [reward, setReward] = React.useState({
    id: null,
    project_id: id,
    name: '',
    image: null,
    cost: '',
    description: '',
    send: 0,
    take_city: null,
    take_adress: '',
    take_phone: '',
    how_to_get: null,
    letter: 0,
    date_sending: '',
    total: '',
  })

  const [debounced] = useDebouncedValue(reward, 1000)

  const [edit, setEdit] = React.useState(false)

  const [modal, setModal] = React.useState({
    delete: false,
  })

  const handleModal = (name, value) => {
    setModal({...modal, [name]: value})
  }

  const [loading, setLoading] = React.useState({
    layout: false,
    create: false,
    delete: false,
    edit: false,
  })

  const handleLoading = (name, value) => {
    setLoading({...loading, [name]: value})
  }

  const [image, setImage] = React.useState()

  React.useEffect(e => {
    if (!image) return
    setReward({...reward, image: URL.createObjectURL(image)})
  }, [image])

  const handleImage = e => {
    if (e.target.files[0]) setImage(e.target.files[0])
  }
  const bodyFormData = new FormData();

  const apend = async e => {
    bodyFormData.append('id', reward?.id  ); 
    bodyFormData.append('project_id', reward?.project_id || id);
    bodyFormData.append('name', reward?.name || '');
    bodyFormData.append('image', image || reward?.image);
    bodyFormData.append('cost', reward?.cost || '');
    bodyFormData.append('description', reward?.description || '');
    bodyFormData.append('send', reward?.send || '');
    bodyFormData.append('take_city', reward?.take_city || '');
    bodyFormData.append('take_adress', reward?.take_adress || '');
    bodyFormData.append('take_phone', reward?.take_phone || '');
    bodyFormData.append('letter', reward?.letter || '');
    bodyFormData.append('how_to_get', reward?.how_to_get || '');
    bodyFormData.append('date_sending', reward?.date_sending || '');
    bodyFormData.append('total', reward?.total || '')
    bodyFormData.append('bought', 0)
  }


  const [takeCheck, setTakeCheck] = React.useState(false)
  const [howToGetCheck, setHowToGetCheck] = React.useState(false)
  
  React.useEffect(e => {
    if (reward.take_city != null) setTakeCheck(true)
    else setTakeCheck(false)

    if (reward.how_to_get) setHowToGetCheck(true)
    else setHowToGetCheck(false)
  }, [edit])

  const handleInputChange = e => {
    const { name, value } = e.target;
    setReward({ ...reward, [name]: value });
  };  

  const [date, setDate] = React.useState()

  React.useEffect(e => {
    setReward({...reward, date_sending: date})
  }, [date])

  const validate = (reward?.name && (image ?? reward?.image) && reward?.cost && reward?.total && reward?.description) && (reward?.send == 1 || reward?.take_city || reward?.letter)

  const saveReward = async () => {
    if (validate) {
      if (edit) {
        handleLoading("create", true)
        await apend()
          await RoleService.updateReward(bodyFormData, id)
          .then(e => {
            console.log(e, "update");
            HttpService.getRewardByProjectId(id)
            .then(e => {
              setRewards(e.data.filter(reward => {
                return reward?.name != '?????????????????????????????????? ??????????????????'
              }))
              console.log(e.data, "rewards");
              handleLoading("create", false)
            })
            .catch((err) => {
              console.log(err)
            });
          })
          .catch(e => {
            console.log(e);
          })
          return
      }  else {
        handleLoading('create', true)
        await apend()
        await MainService.createReward(bodyFormData)
        .then(e => {
          HttpService.getRewardByProjectId(id)
          .then(e => {
            setRewards(e.data.filter(reward => {
              return reward?.name != '?????????????????????????????????? ??????????????????'
            }))
            handleLoading("create", false)
            setReward({})
            success("????????????????????????????", "???????????????????????????? ?????????????? ??????????????!")
          })
          .catch((e) => {
            console.log(e)
            handleLoading("create", false)
            error("????????????????????????????", "??????-???? ?????????? ???? ??????, ???????????????????? ?????? ??????")
          });
        })
        .catch(e => {
          console.log(e);
          handleLoading("create", false)
        });
      }
    } else {
      info("????????????????????????????", "?????????????????? ?????? ????????")
    }
  };  

  const editReward = async e => {
    setReward(e)  
    setEdit(true)
  }

  const clearReward = e => {
    setReward({
      id: null,
      project_id: id,
      image: image,
      send: 0,
      take_city: null,
      how_to_get: null,
      letter: 0,
    })
    setEdit(false)
  }

  const deleteReward = async e => {
    handleLoading("delete", true)
    MainService.deleteReward(reward?.id)
    .then(e => {
      HttpService.getRewardByProjectId(id)
      .then(e => {
        setRewards(e.data.filter(reward => {
          return reward?.name != '?????????????????????????????????? ??????????????????'
        }))
        success("????????????????????????????", "???????????????????????????? ?????????????? ??????????????!")
        setReward({})
        handleModal('delete', false)
      })
      .catch((e) => {
        handleModal('delete', false)
        error("????????????????????????????", "???? ?????????????? ?????????????? ????????????????????????????")
        console.log(e)
      });
    })
    .catch(e => {
      console.log(e);
      handleLoading("delete", false)
    })
  }

  React.useEffect(e => {
    if (!modal?.delete) setReward({})
  }, [modal.delete])


  const handleSend = e => {
    if (reward.send === 0) setReward({...reward, send: 1});
    else setReward({...reward, send: 0});
  }

  const handleTake = e => {
    setTakeCheck(q => !q)
    setReward({...reward, 
      take_city: null,
      take_adress: '',
      take_phone: '',
    })
  }
  const handleHowToGet = e => {
    setHowToGetCheck(q => !q)
    setReward({...reward, how_to_get: ''})
  }
  const handleLetter = e => {
    if (reward.letter === 0) setReward({...reward, letter: 1});
    else setReward({...reward, letter: 0});
  }  

  const handleDelete = e => {
    setReward(e)
    handleModal('delete', true)
  }

  return (
    <>
      <div className={styles.row}>
        <LoadingOverlay visible={loading.create} />
        <form>
          <div className={styles.wrapper}>
            <div className={styles.inputField}>
              <label className={styles.label}>
                <span className={styles.labelName}>
                  ???????????????? ????????????????????????????
                </span>
              </label>
              <TextInput
                required
                name="name"
                value={reward.name || ''}
                onChange={handleInputChange}
                maxLength="50"
                placeholder="?????????????? ????????????????"
                classNames={{
                  input: styles.input
                }}
                variant="unstyled"
              />
            </div>
          </div>

            <div className={styles.wrapper}>
              <div className={styles.inputField}>
                <label className={styles.label}>
                  <span className={styles.labelName}>
                    ???????? ????????????????????????????
                  </span>
                </label>
                <input
                  required
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className={styles.fileInput}
                />
              </div>
            </div>
            <div className={styles.wrapper}>  
              <div className={styles.inputField}>
                <label className={styles.label}>
                  <span className={styles.labelName}>
                    ???????????????? ????????????????????????????
                  </span>
                </label>
                <Textarea
                  className="reward-descrip"
                  name="description"
                  required
                  value={reward.description || ''}
                  onChange={handleInputChange}
                  maxLength="256"
                  placeholder="?????????????? ???????????????????????????? ?? ???????????? ????????????????????????????, ?????????????? ???????????????????????? ???????????????????? ?????? ???????????? ?????????????????????? ?? ??????????????: (????????, ????????????, ??????).
                  ?????????? ???????????? ???????????????????? ?????????? ???????????????????? ?????????? ???????????? ???? ???????????? '???????????? ?? ????????????????????'."
                  classNames={{
                    input: styles.textarea
                  }}
                  variant="unstyled"
                />
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.inputField}>
                <label className={styles.label}>
                  <span className={styles.labelName}>
                    ?????????????????? ????????????????????????????
                  </span>
                </label>
                <NumberInput
                  required
                  value={reward.cost || 0}
                  name="cost"
                  onChange={e => setReward({...reward, cost: e})}
                  maxLength="6"
                  placeholder="?????????????? ??????????????????"
                  classNames={{
                    input: styles.input
                  }}
                  variant="unstyled"
                />
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.inputField}>
                <label className={styles.label}>
                  <span className={styles.labelName}>
                    ???????????????????? ????????????????????????????
                  </span>
                </label>
                <NumberInput
                  required
                  name="total"
                  value={reward.total || 0}
                  onChange={e => setReward({...reward, total: e})}
                  placeholder="?????????????? ?????????? ???????????? ???????????????? ???????????? ?????????????????????????????"
                  classNames={{
                    input: styles.input
                  }}
                  variant="unstyled"
                />            
              </div>
            </div>

            <div className={styles.wrapper}>   
              <div className={styles.checkLabel}>
                <Checkbox
                  label="???????????? ?? ????????????????????"
                  classNames={{
                    label: styles.labelName
                  }}
                  required
                  onChange={handleHowToGet}
                  checked={howToGetCheck ? true : false}
                />    
              </div>
            </div> 

            <Collapse in={howToGetCheck}>
              <div className={styles.wrapper}>
                <div className={styles.inputField}>
                  <label className={styles.label}>
                    <span className={styles.labelName}>
                      (???? ??????????????????????)
                    </span>  
                  </label>  
                  <Textarea 
                    name="how_to_get" 
                    value={reward.how_to_get || ""} 
                    onChange={handleInputChange}
                    placeholder="???????? ???????????? ???????????????? ?? ???????????????????? ???????????? ???????????????????????????? ?? ??????????????: (????????, ????????????, ??????) ???? ???????????????? ?????????? ????????????, ?? ?????????? ???????????????? ???????? ????????????."
                    variant="unstyled"
                    classNames={{
                      input: 'p-4 overflow-hidden resize-none h-[100px]'
                    }}
                  >
                  </Textarea>
                </div>
              </div>
            </Collapse>
          

            <div className={styles.wrapper}>
              <div className={`${styles.checkLabel} max-w-[275px]`}>
                <label className="flex items-center justify-between">
                  <span className={styles.labelName}>
                    ???????????????? ?????? ?????????????????? 
                  </span>
                  <Tooltip
                    withArrow
                    width={280}  
                    wrapLines
                    transition="fade"
                    transitionDuration={200}
                    label="?????? ?????????????????? ?????????????? ???????????????????????????? ?????????? ?????????????????? ???????????????????? ??????????????. 
                    ????????????????: ???????? ???????????? ?????????????????? ???????????????????????????? (???? ??????????, ????????????????, ?????????????? ????????????????).
                    ?????????? ????????????: ???????????? ?????????????????? ?????????? ?????????????? ????????????????????????????.
                    ????????????: ?????? ?????????? ???????? ?????????????????????? ???????????? (???????? ???????????? ?????????????????? ????????????, ??????????????????????????, ??????????) ?????? ???????????? ???? ??????????"
                  >
                    <span className={styles.labelIcon}>
                      <CgDanger/>
                    </span>
                  </Tooltip>
                </label>
              </div>
            </div>
            <div className={styles.wrapper}>   
              <div className={styles.checkLabel}>
                <Checkbox
                  required
                  name="send"
                  onChange={handleSend}
                  label="????????????????"
                  classNames={{
                    label: styles.labelName
                  }}
                  checked={reward.send == 1 ? true : false}
                />  
                <Collapse in={reward?.send == 1}>
                  <p className="text-sm text-slate-600 mt-4">?????????? ?????????????????? ?????????????? ???? ???????????????? ???????????? ?????????????????????? ?????? ???????????????? ????????????????????????????.</p>
                </Collapse>
              </div>
            </div>

            <div className={styles.wrapper}>
              <div className={styles.checkLabel}>
                <Checkbox
                  label="?????????? ????????????"
                  classNames={{
                    label: styles.labelName
                  }}
                  required
                  onChange={handleTake}
                  checked={takeCheck ? true : false}
                />    
              </div>
            </div>
            <Collapse in={takeCheck}>
              <>
                <div className={styles.wrapper}>
                  <div className={styles.inputField}>
                    <label className={styles.label}>
                      <span className={styles.labelName}>
                        ??????????
                      </span>
                    </label>
                    <TextInput
                      placeholder="?????????????? ?????????????????? ?????????????? ?? ??????????" 
                      name="take_city" value={reward.take_city || ""} 
                      onChange={handleInputChange}
                      variant="unstyled"
                      classNames={{
                        input: styles.input
                      }}
                    />
                  </div>
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.inputField}>
                    <label className={styles.label}>
                      <span className={styles.labelName}>
                        ????????????
                      </span>
                    </label>
                    <TextInput
                      placeholder="???????????????? ??????????, ??????/????????????, ????/????????, ??????????????????" 
                      name="take_adress" value={reward.take_adress || ""} 
                      onChange={handleInputChange}
                      variant="unstyled"
                      classNames={{
                        input: styles.input
                      }}
                    />
                  </div>
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.inputField}>
                    <label className={styles.label}>
                      <span className={styles.labelName}>
                        ??????????????
                      </span>
                    </label>
                    <TextInput
                      placeholder="???? ?????????? ?????????? ????????????????????" 
                      name="take_phone" value={reward.take_phone || ""} 
                      onChange={handleInputChange}
                      variant="unstyled"
                      classNames={{
                        input: styles.input
                      }}
                    />
                  </div>
                </div>
              </>
            </Collapse>

            <div className={styles.wrapper}>   
              <div className={styles.checkLabel}>
                <Checkbox
                  label="????????????"
                  classNames={{
                    label: styles.labelName
                  }}
                  required
                  name="letter"
                  onChange={handleLetter}
                  checked={reward.letter == 1 ? true : false}
                />  
                <Collapse in={reward?.letter}>
                  <p className="text-sm text-slate-600 mt-4">?????????? ?????????????????? ?????????????? ???? ???????????????? ?????????????????????? ???????????? ?????????????????????? ?????? ???????????????? ????????????????????????????.</p>
                </Collapse>
              </div>
            </div>

            <div className={`${styles.wrapper} border-b`}>
              <div className={styles.inputField}>
                <label className={styles.label}>
                  <span className={styles.labelName}>
                    ???????? ???????????????? ????????????????????????????
                  </span>
                  <Tooltip 
                    withArrow
                    width={280}  
                    wrapLines
                    transition="fade"
                    transitionDuration={200}
                  >
                    <span></span>
                  </Tooltip>
                </label>
                <DatePicker
                  placeholder="???????????????? ????????"
                  value={reward.date_sending || ''}
                  onChange={e => setDate(format(e, 'yyyy/MM/dd'))}
                  classNames={{
                    input: styles.input
                  }}
                  inputFormat="YYYY/MM/DD"
                  labelFormat="YYYY/MM/DD"
                  required
                  variant="filled"
                  locale="ru"
                />
              </div>
            </div>

            <div className="flex justify-center items-center mt-8">
              <Button type="button" color="red" onClick={saveReward} >
                ?????????????????? ????????????????????????????
              </Button>
              {edit && (
                <Button type="button" variant="outline" className="ml-4" onClick={clearReward}>???????????????? ??????????????????</Button>
              )}
            </div>
            
        </form>
              
        <div className="ml-0 sm:ml-10">
          <div className="h-auto">
            <RewardForm reward={debounced} preview />
          </div>

          <p className="text-slate-500 text-[11px] uppercase my-4">
            ???????????????????????????? ?????????????? ?????????? ?????????????????????? ?????????????????????? ???????????? ??????????????????????????
          </p>
            <div className="overflow-y-scroll max-h-[1200px]">
              {rewards.map((item, index) => {
                return (
                  <div className="mb-4" key={index}>
                    <RewardForm 
                      reward={item} 
                      edit 
                      editReward={editReward} 
                      deleteReward={handleDelete}
                      setReward={setReward}
                      project={project}
                    />
                  </div>
                )}).reverse()
              }
            </div>
        </div>
      </div>
      <Modal
        opened={modal.delete}
        onClose={e => handleModal('delete', false)}
        centered
        withCloseButton={false}
        size="sm"
      >
        <div className="text-center">
          <LoadingOverlay visible={loading.delete} />
          <p className="mb-4">?????????????? ???????????????????????????? <span className="link">{reward?.name}</span>?</p>
          <Button
            className="text-xs uppercase"
            onClick={deleteReward}
          >
            ??????????????
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Reward

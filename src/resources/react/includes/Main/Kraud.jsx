import React from "react";
import funding from  "../../../../public/images/funding.png"
import aboutus from  "../../../../public/images/about-us.png"
import kraud from  "../../../../public/images/kraud.png"

const styles = {
  heading: 'text-xl md:text-2xl font-semibold font-head mb-4',
  description: '',
  container: 'p-0 md:p-4 text-center md:text-left',
}


export default function Kraud() {
    return (
      <div className="w-full mt-14 bg-white py-6">
        <div className="container">
          <div className="grid grid-cols-1 grid-rows-6 md:grid-rows-3 md:grid-cols-2">
            <div className={styles.container}>
              <h2 className={styles.heading}>Что такое краудфандинг?</h2>
              <p className="">
                Краудфандинг (от англ. crowdfunding) — это способ
                коллективного финансирования проектов, при котором деньги на
                создание нового продукта поступают от его конечных
                потребителей.
                Автор крауд-проекта может собрать средства на реализацию
                идеи и заранее оценить ее востребованность, а участник —
                сделать вклад в начинание автора и получить за это
                вознаграждение.
              </p>
            </div> 
            <img src={kraud}/>
            <img src={funding} className="row-start-4 md:row-start-auto"/>
            <div className={styles.container}>
              <div>
                <h2 className={styles.heading}>Что такое вознаграждение?</h2>
                <p>
                  Это бонус, предлагаемый автором крауд-кампании в обмен на
                  поддержку.
                  Вознаграждения могут быть материальными (например, футболки,
                  диски, реквизит со съемок кино) и нематериальными
                  (мастер-классы, цифровые версии альбомов и т. д.).
                  Список вознаграждений крауд-проекта располагается на его
                  странице в колонке справа.
                </p>
              </div>
            </div>
            <div className={styles.container}>
              <h2 className={styles.heading}>О нашем сайте</h2>
              <p>
                
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, aliquam. Dicta fugit, porro deserunt fuga provident ratione dolorum illum voluptates earum animi obcaecati beatae sunt voluptatum consequatur distinctio ab eius?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat distinctio hic ullam, ipsam temporibus reprehenderit asperiores porro dolorem est eaque reiciendis error ab nesciunt, laboriosam, corporis ad doloremque repudiandae magnam odit. Voluptatibus voluptatum nesciunt quisquam?
              </p>
            </div>
            <img src={aboutus} />
          </div>
        </div>
      </div>
    );
}

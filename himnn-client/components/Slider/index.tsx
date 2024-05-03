"use client"

import ButtonDefault from "@/ui/Buttons/Default";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SliderBox = () => {
    const router = useRouter();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dotsClass: styles.Controlls,
    };

    const titles = ["Паронит ПОН-Б 3мм (1500х1700)", "Паронит ПОН-Б ГОСТ 481-80", "Капролон стержневой", "Пластина МБС-С ГОСТ 7338-90", "Фторопласт листовой"]

    return (
        <Slider {...settings}>
            {[1, 2, 3, 4].map((index) => (
                <div key={index}>
                    <section
                        className={`${styles.Slider} ${index !== 3 ? styles.Active : ""}`}
                        style={{ background: `url("/Home_Slider_${index}.png") no-repeat` }}
                    >
                        <div className={styles.Box}>
                            <h1>{titles[index]}</h1>
                            <ul>
                                <li>ГОСТ 481-80</li>
                                <li>В наличии </li>
                            </ul>
                            <ButtonDefault onClick={() => router.push("/catalog")}>Перейти в каталог</ButtonDefault>
                        </div>

                        <img className={styles.Image} src={`/SliderItem_${index !== 0 ? 1 : 0}.png`} alt="slider-img" />
                    </section>
                </div>
            ))}
        </Slider>
    )
}

export default SliderBox
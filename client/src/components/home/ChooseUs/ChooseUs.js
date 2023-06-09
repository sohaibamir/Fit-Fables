import { Heading } from "@chakra-ui/layout";
import styles from "./choose.module.css";

const db = [
    {
        img: "/images/regUsers.svg",
        title: "32 Million+",
        para: "Registered users as of June 01, 2023"
    },
    {
        img: "/images/rider.svg",
        title: "36 Million+",
        para: "Orders on Fit Fables till date"
    },
    {
        img: "/images/uniqueItems.svg",
        title: "99000+",
        para: "Unique items sold last 3 months"
    },
    {
        img: "/images/pinCodes.svg",
        title: "19500+",
        para: "Pin codes serviced last 3 months"
    }
];

const ChooseUs = () => {
    return (
        <div className={styles.container}>
            <Heading size="md" m="1rem" style={{ color: "#55585e" }}>
                Why Choose Us?
            </Heading>
            <div className={styles.flexBox}>

                {db.map((item) => {
                    return (
                        <div key={item.title}>
                            <img style={{ marginBottom: "30px" }} src={item.img} alt="" />
                            <Heading
                                size="md"
                                style={{
                                    color: "#55585e",
                                    marginBottom: "16px"
                                }}
                            >
                                {item.title}
                            </Heading>
                            <div
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    color: "#55585e"
                                }}
                            >
                                {item.para}
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default ChooseUs;
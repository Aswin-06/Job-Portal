import style from "./NavBar.module.css"
import { AiFillHome } from "react-icons/ai";

function NavBar()
{
    return(
        <>
            <div className={style.div}>
                <h2 className={style.heading}>Job Portal</h2>
                <div className={style.button}>
                    <div>
                        <a className={style.decom} href="/internships" >Internship</a>
                        <a className={style.decom} href="/jobs">Jobs</a>
                        <a className={style.decom} href="">Courses</a>
                    </div>
                    <a href="/" className={style.home}><AiFillHome size={30}/></a>
                </div>
            </div>
        </>
    )
}

export default NavBar;
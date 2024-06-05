import footer_logo from "../Assets/logo_big.png"
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

export default function Footer() {
  return (
    <div className="flex flex-col h-full items-center gap-12 bg-red-400">
        <div className="flex items-center gap-5">
            <img src={footer_logo} alt="" />
            <p className="text-5xl font-bold">E-Commerce</p>
        </div>
        <ul className="flex gap-y-0 gap-x-12 text-xl h-0 items-center bg-slate-400">
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Contact</li>
        </ul>
        <div className="flex gap-5 h-1">
            <div className="p-2.5 pb-1.5 border-solid border-gray-50">
                <img src={instagram_icon} alt="" />                
            </div>
            <div className="p-2.5 pb-1.5 border-solid border-gray-50">
                <img src={pintester_icon} alt="" />                
            </div>
            <div className="p-2.5 pb-1.5 border-solid border-gray-50">
                <img src={whatsapp_icon} alt="" />                
            </div>
        </div>
        <div className="flex h-0 flex-col items-center gap-8 w-full mb-8 text-xl">
            <p>Copyright @2024 - All Registered</p>
        </div>
    </div>
  )
}


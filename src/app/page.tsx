"use client"
import Image from "next/image";
import { FiChevronsRight } from "react-icons/fi";
import AlertMessage from "@/app/component/AlertMessage";
import Nav from "./component/Navbar";
import bg1 from "../../public/assets/bg/bg1.jpg"
import bg2 from "../../public/assets/bg/bg2.jpg"

import icon1 from "../../public/assets/icon/01.png"
import iconGame1 from "../../public/assets/icon/iconGame/01.jpg"
import iconGame2 from "../../public/assets/icon/iconGame/02.jpg"
import iconGame3 from "../../public/assets/icon/iconGame/03.jpg"
import iconGame4 from "../../public/assets/icon/iconGame/04.jpg"
import iconGame5 from "../../public/assets/icon/iconGame/05.jpg"
import iconGame6 from "../../public/assets/icon/iconGame/06.jpg"

import "./globals.css";
import Link from "next/link";
import { useState } from "react";
export default function Home() {

  const game = [
    { cover: iconGame1, title: "SlotGame1" },
    { cover: iconGame2, title: "SlotGame1" },
    { cover: iconGame3, title: "SlotGame1" },
    { cover: iconGame4, title: "SlotGame1" },
    { cover: iconGame5, title: "SlotGame1" },
    { cover: iconGame5, title: "SlotGame1" },
  ]
  return (
    <>
      <Nav />
      <div className=" relative">
        <Image alt="bg1" src={bg1} className=" bg-repeat w-[100%] h-[100%]" />
        <Image alt="bg1" src={bg2} className=" bg-repeat w-[100%] h-[100%]" />
        <div className="w-full absolute top-14">
          <section>
            <div className=" container w-[960px] m-auto">
              <div className="flex justify-between">
                <div className=" mt-36">
                  <p className="text-white text-[25px] m-0">ເວັບອັນດັບ 1</p>
                  <p className="text-white text-[60px]" style={{ textShadow: "2px 2px 2px rgba(255, 0, 82, .9)" }}>ເກມອອນລາຍ</p>
                  <p className="text-white text-[25px] flex justify-start items-center"><FiChevronsRight color="green" /> ເວັບຕົງ</p>
                  <p className="text-white text-[25px] flex justify-start items-center"><FiChevronsRight color="green" /> ແຈກແທ້</p>
                  <p className="text-white text-[25px] flex justify-start items-center"><FiChevronsRight color="green" /> ຈ່າຍຈີງ</p>
                </div>
                <div className="">
                  <Image alt="icon1" src={icon1} className="w-[600px]" />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className=" container w-[960px] m-auto">
              <div className="w-full flex justify-around items-center rounded-lg bg-cyan-950 py-3">
                <p className="text-white text-lg">ຍອດແຈັກພ໋ອດສະສົມ</p>
                <div className=" flex justify-center items-end gap-2 text-white">
                  <div className="px-2 bg-red-300 text-[50px] rounded-lg flex justify-center items-center">
                    1
                  </div>,
                  <div className="px-2 bg-red-300 text-[50px] rounded-lg flex justify-center items-center">
                    0
                  </div>
                  <div className="px-2 bg-red-300 text-[50px] rounded-lg flex justify-center items-center">
                    0
                  </div>
                  <div className="px-2 bg-red-300 text-[50px] rounded-lg flex justify-center items-center">
                    0
                  </div>,
                  <div className="px-2 bg-red-300 text-[50px] rounded-lg flex justify-center items-center">
                    0
                  </div>
                  <div className="px-2 bg-red-300 text-[50px] rounded-lg flex justify-center items-center">
                    0
                  </div>
                  <div className="px-2 bg-red-300 text-[50px] rounded-lg flex justify-center items-center">
                    0
                  </div>.
                  <div className="px-2 bg-red-300 text-[50px] rounded-lg flex justify-center items-center">
                    0
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-20">
            <div className=" container w-[960px] m-auto">
              <div className=" flex justify-start gap-10">
                <div className="w-[30%]">
                  <div className="w-full py-3 px-2 bg-red-500 text-white rounded-lg  shadow-white" >
                    <p className="text-lg text-center">ປະເພດເກມ</p>
                  </div>
                  <div className=" mt-5 bg-blue-950 rounded-lg">
                    <div className="border-b-2">
                      <p className="py-3 text-lg text-white text-center">Slot Game</p>
                    </div>
                    <div className="border-b-2">
                      <p className="py-3 text-lg text-white text-center">Slot Game</p>
                    </div>
                    <div className="border-b-2">
                      <p className="py-3 text-lg text-white text-center">Slot Game</p>
                    </div>
                    <div className="border-b-2">
                      <p className="py-3 text-lg text-white text-center">Slot Game</p>
                    </div>
                  </div>
                  <div>

                  </div>
                </div>
                <div className="w-[70%]">
                  <div className="w-full py-3 px-2 bg-white text-red-500 rounded-lg  shadow-white" >
                    <p className="text-lg text-center">ລາຍການເກມ</p>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-8">
                    {game.map((item, index) => {
                      return (
                        <Link className=" relative" key={index} target="bank" href="https://codecanyon.net/item/html-wild-west-slot-game/full_screen_preview/52146811?_ga=2.50987177.1203146145.1717149977-1032651987.1684309019">
                          <div className=" rounded-lg overflow-hidden hover:p-2 duration-500 ease-in-out ">
                            <Image alt="cover" src={item.cover} className="w-full" />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

          </section>
        </div>

      </div>

    </>
  );
}

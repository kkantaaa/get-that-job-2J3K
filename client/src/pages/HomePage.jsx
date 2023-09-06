function Homepage() {
  return (
    <>
      <div className="bg-White h-[64px] flex justify-center">
        <div className="w-full h-full flex  flex-row  justify-between mx-[8.333%]">
          <div className="bg-white ">nav1</div>
          <div className="bg-white ">nav2</div>
        </div>
      </div>

      <div className="bg-Background h-[833px] flex flex-col justify-around items-center">
        <div className="bg-red-200">
          The place where you get <span>that</span> job
        </div>
        <div className="bg-red-400">
          With our Machine Learning algorithm you will get that job
          <br />
          in no time. We promise you! Just give us the money and we
          <br />
          will take care of it.
        </div>
        <div className="bg-red-600">CREATE AN ACCOUNT NOW</div>
        <div className="bg-red-800">pic</div>
      </div>

      <div className=" w-full flex  flex-row h-[472px]">
        <div className="bg-DarkPink w-3/5 h-full">
          <div className=" bg-pink-700 mx-[13.6364%]  h-full flex flex-col justify-around text-left">
            <div className="bg-pink-100 ">Find your next job</div>
            <div className="bg-pink-300 ">
              Our Machine learning algorithm is so good that it’s even illegal
              in some countries. Join us to use our barelly legal algorithm that
              is actually a group of interns that work on our basement.
            </div>
            <div className="bg-pink-500 ">
              We have a job for you, no matter your background or previous
              experience. Is sending random memes through chat your only skill?
              That’s ok, we got you, our Rock Star Meme Curator role is here for
              you.
            </div>
          </div>
        </div>
        <div className="bg-white w-2/5">pic</div>
      </div>
      <div className="w-full flex justify-center">
        <div className="bg-Background-foreground h-[537px] w-full mx-[8.333%] flex flex-col justify-around items-center">
          <div className="h-[486px]">
            <div className="bg-green-300">Meet the team</div>
            <div className="bg-green-600 h-[273px] flex flex-row justify-center">
              <div className="bg-green-200 flex flex-col items-center">
                <div>pic1</div>
                <div>name1</div>
                <div className="bg-green-400 flex flex-row justify-around">
                  <div>icon1.1</div>
                  <div>icon1.2</div>
                </div>
              </div>

              <div className="bg-green-200 flex flex-col items-center">
                <div>pic2</div>
                <div>name2</div>
                <div className="bg-green-400 flex flex-row justify-around">
                  <div>icon2.1</div>
                  <div>icon2.2</div>
                </div>
              </div>

              <div className="bg-green-200 flex flex-col items-center">
                <div>pic3</div>
                <div>name3</div>
                <div className="bg-green-400 flex flex-row justify-around">
                  <div>icon3.1</div>
                  <div>icon3.2</div>
                </div>
              </div>

              <div className="bg-green-200 flex flex-col items-center">
                <div>pic4</div>
                <div>name4</div>
                <div className="bg-green-400 flex flex-row justify-around">
                  <div>icon4.1</div>
                  <div>icon4.2</div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[51px] bg-green-900">
            <hr />© 2021 - Get That Job
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;

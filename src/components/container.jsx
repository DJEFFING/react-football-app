import { Header } from "./Header/Header";
import { token } from "../environements/environement";
import { Input } from "./Input/input";
import { List } from "./List/List";

export const Container = () => {
    const getMatchList = async () =>{
        try{
            const response = await fetch(`https://www.scorebat.com/video-api/v3/feed/?token=${token.VIDEO_API_ACCESS_TOKEN}`);
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            const result = await response.json();
            // console.log(result);
            return result;

        }catch (err){
            console.log("Une erreur c'est produite ", err.message);
        }
    };

  return (
    <main>
      <Header />
      <Input />
      <List getMatchList={getMatchList} />
    </main>
  );
};

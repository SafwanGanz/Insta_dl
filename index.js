// © 2024 Delta D Coders
// https://github.com/SafwanGanz/insta_dl

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const snapsave = require("snapsave-downloader2");
const { exec } = require('child_process');

const color = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
};

console.log(`${color.yellow} 
           ██╗███╗░░██╗░██████╗████████╗░█████╗░
           ██║████╗░██║██╔════╝╚══██╔══╝██╔══██╗
           ██║██╔██╗██║╚█████╗░░░░██║░░░███████║
           ██║██║╚████║░╚═══██╗░░░██║░░░██╔══██║
           ██║██║░╚███║██████╔╝░░░██║░░░██║░░██║
           ╚═╝╚═╝░░╚══╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝\n
                       ██████╗░██╗░░░░░
                       ██╔══██╗██║░░░░░
                       ██║░░██║██║░░░░░
                       ██║░░██║██║░░░░░
                       ██████╔╝███████╗
                       ╚═════╝░╚══════╝\n
                      Author: SafwanGanz (DDC)\n\n`)
async function downloadInstaReel() {
    try {
        console.log(`${color.yellow}Enter The Insta Reel Url: `);

        process.stdin.on("data", async (data) => {
            const link = data.toString().trim();
            process.stdin.pause(); 


            const igdl = await snapsave(link);
            

            if (igdl && igdl.data && igdl.data.length > 0) {
                const downloadUrl = igdl.data[0].url;
                console.log(`${color.green}Downloading the reel`);


                const timestamp = Date.now();
                const folderName = `InstaReel`;
                const downloadsDir = path.join('/sdcard/Download', folderName);


                if (!fs.existsSync(downloadsDir)) {
                    fs.mkdirSync(downloadsDir, { recursive: true });
                }

                const outputPath = path.join(downloadsDir, `${timestamp}.mp4`);


                await downloadVideo(downloadUrl, outputPath);

                console.log(`${color.green}Video saved to: ${outputPath}`);
            } else {
                console.log(`${color.red}No download URL found. Please check the provided link.`);
            }
        });
    } catch (error) {
        console.error(`${color.red}Error:`, error);
    }
}


async function downloadVideo(url, outputPath) {
    const writer = fs.createWriteStream(outputPath);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });


    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}


downloadInstaReel();

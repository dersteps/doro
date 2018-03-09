/**
 * This is Doro's main build script. It replaces grunt and other stuff by pure node magic :)
 */
const minimist = require('minimist');
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const cp = require('child_process');
const electronPackager = require('electron-packager')
const pkg = require('./package.json')
const config = require('./build.cfg');
const series = require('run-series');
const builder = require('electron-builder');

const BUILD_DIR_NAME = "build";
const NODE_DIR_NAME = "node_modules";

let tasks = [];

const args = minimist(process.argv.slice(2), {
    default: {
      cpstdio: 'inherit'
    },
    string: [
      'cpstdio'
    ]
  });

function info(text) {
    console.log("[" + "★".cyan + "] " + text);
}

function success(text, noindent) {
    const add = 
    console.log("[" + "✔".green + "]   " + ">> ".gray + text);
}

function error(text) {
    console.log("[" + "✖".red + "] " + text);
}

function die(errorcode, message) {
    error(message);
    process.exit(errorcode);
}

function intro() {
    console.log("");
    console.log("██████╗  ██████╗ ██████╗  ██████╗ ");
    console.log("██╔══██╗██╔═══██╗██╔══██╗██╔═══██╗");
    console.log("██║  ██║██║   ██║██████╔╝██║   ██║");
    console.log("██║  ██║██║   ██║██╔══██╗██║   ██║");
    console.log("██████╔╝╚██████╔╝██║  ██║╚██████╔╝");
    console.log("╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ");
                                                                        
    console.log("   Made with " + "❤".red + " by steps0x29a");
    console.log("");
    console.log("Test 123, hallo Christian".rainbow);
}

function celebrate(text) {
    console.log(text.rainbow);
}

/**
 * Cleans the build directory
 */
function clean(callback) {
    const buildDir = path.join(__dirname, BUILD_DIR_NAME);
    info("☢".yellow + " Nuking build directory '" + buildDir + "'...");

    if(fs.existsSync(buildDir)) {
        try {
            rimraf.sync(buildDir);
            success("Build directory nuked");
            callback(null);
        } catch (err) {
            die(1, "Unable to clean build directory");
        }
    } else {
        success("Working tree is clean");
        callback(null);
    }
}

function nukeNodeModules() {
    const buildDir = path.join(__dirname, NODE_DIR_NAME);
    info("☢".yellow + " Nuking directory '" + buildDir + "'...");

    if(fs.existsSync(buildDir)) {
        try {
            rimraf.sync(buildDir);
            success("Node modules directory nuked");
        } catch (err) {
            die(1, "Unable to clean node modules directory");
        }
    } else {
        success("Node modules clean");
    }
}

function installNodeModules() {
    info("⚙".green + " Installing node modules...");
    cp.execSync('npm install', {stdio: args.cpstdio });
    success("Done");

    info("⚙".green + " Deduping node modules...");
    cp.execSync('npm dedupe', { stdio: args.cpstdio })
    success("Done");
}

function mkdir(path) {
    try {
        info("🖿".yellow + " Creating directory '" + path + "'...");
        fs.mkdirSync(path);
        success("Directory created: '" + path + "'");
    } catch (err) {
        die(10, "Unable to create directory: " + err);
    }
}

// Build for linux
const linux = {
    // Build for Linux.
    platform: 'linux',
    
    // Build ia32 and x64 binaries.
    arch: ['ia32', 'x64'],
    
    out: path.join(__dirname, BUILD_DIR_NAME, "linux")
};

const all = {
    dir: __dirname,
    overwrite: true,
    prune:true,
    download: { quiet: true, strictSSL: true },
    quiet: true
};



function packageLinux(callback) {
    info("Packaging app for Linux (this might take a while)...");
    electronPackager(Object.assign({}, all, linux), (err, buildPath) => {
        if(err) {
            die(1, err);
        }
        success("Built Linux binaries in " + buildPath);
        callback(null, buildPath);
    });
}


intro();

tasks.push(clean, packageLinux);

series(tasks, (error, result_array) => {
    if(error) {
        die(666, "Packaging error: " + error);
    }

    //console.log(result_array);
    success("Build script finished".green);

});
import sys
import subprocess

def print_usage():
    print 'Make sure you have installed nodejs and cordova-cli. \n \
            Usage: python %s [install-plugins]' % (__file__)

plugins = ['com.ibm.mobile.cordova.ibmbluemix',
        'com.ibm.mobile.cordova.ibmpush',
        'org.apache.cordova.console',
        'org.apache.cordova.inappbrowser',
        'org.apache.cordova.splashscreen',
        'org.apache.cordova.device',
        'uk.co.whiteoctober.cordova.appversion',
        'extras/musa-mobile-driver'
        ]

def install_plugins():
    for x in plugins:
        print 'install cordova plugin %s' % (x)
        p = subprocess.Popen('cordova plugin add %s' % (x), shell = True)
        p.wait()

if __name__ == '__main__':
    params = sys.argv[1:]
    if len(params) == 0 : print_usage()
    if 'install-plugins' in params: install_plugins()
import subprocess
import os
import argparse
from shutil import rmtree, copy



def build(message):
    skip_files = ['.git', '.gitignore', '.nojekyll', 'build.py']
    target_path = '../topatagonia.xyz'
    target_dir = os.path.abspath(target_path)
    project_dir = os.getcwd()

    print('\n..building jekyll site')
    cmd = 'jekyll clean && jekyll build'
    subprocess.run(cmd, shell=True)
    print('..build successful\n')

    print('\n..cleaning up previous build')
    os.chdir(target_dir)
    for current in os.listdir():
        if current not in skip_files:
            if  os.path.isfile(current):
                print("deleting file: " + os.path.abspath(current))
                os.remove(current)
            elif os.path.isdir(current):
                print("deleting directory: " + os.path.abspath(current))
                rmtree(current)
        else:
            print("\tskipping: " + os.path.abspath(current))
    print('..cleaned up previous build successfully\n')

    print('\n..copying built page files into site directory')
    os.chdir(project_dir + '/_site')
    for dirName, subdirList, fileList in os.walk('.'):
        if dirName != '.':
            print('making directory: %s' % target_dir + dirName[1:])
            os.mkdir(target_dir + dirName[1:])
        for fname in fileList:
            print('copying: ' + dirName  + '/' + fname)
            copy(dirName  + '/' + fname, target_dir  + dirName[1:])
    print('..successffully moved files into site directory\n')


    print('\n..publishing site at topatagonia.xyz')
    os.chdir(target_dir)
    cmd = 'git add . && git commit -m \"{}\" && git push'.format(message)
    print(cmd)
    subprocess.run(cmd, shell=True)
    print('..all done :) the page is now published')

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='build and deploy the latest update to topatagonia.xyz')
    parser.add_argument('-m', '--message', help='commit message for the next build of topatagonia.xyz', required=True)
    args = parser.parse_args()
    build(message=args.message)
import subprocess
import os
import shutil


skip_files = ['.git', '.gitignore', '.nojekyll', 'build.py']
target_path = '../tmp'
target_dir = os.path.abspath(target_path)
project_dir = os.getcwd()

print('target dir: ' + target_dir)
print('current dir: ' + project_dir)

print('.. building jekyll site')
cmd = 'jekyll clean && jekyll build'
subprocess.run(cmd, shell=True)


print('.. cleaning up old build')
os.chdir(target_dir)
for dir_content in os.listdir():
    if dir_content not in skip_files:
        if  os.path.isfile(dir_content):
            print("deleting file: " + os.path.abspath(dir_content))
            os.remove(dir_content)
        elif os.path.isdir(dir_content):
            print("deleting directory: " + os.path.abspath(dir_content))
            shutil.tmtree(dir_content)
    else:
        print("\tskipping: " + os.path.abspath(dir_content))
print('..done cleaning up old build\n')

print('..moving built page files into site directory')
os.chdir(project_dir + '/_site')
print(os.getcwd())
for dir_content in os.listdir():
    print(os.path.abspath(dir_content))
    if dir_content not in skip_files:
        if  os.path.isfile(dir_content):
            print('..copying file: ' + dir_content)
            shutil.move(dir_content, target_dir)
        elif os.path.isdir(dir_content):
            shutil.copytree(dir_content, target_dir)
            print('..copying directory: ' + dir_content)
    else:
        print('\t\t..skipping: ' + dir_content)

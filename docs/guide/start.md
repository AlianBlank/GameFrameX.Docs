# 开始

## 快速开始

首先，确保您已安装了Git和.NET（版本 8.0）。

1. 在您的电脑上创建一个新的文件夹，我们将在这里保存项目所需的所有文件。

2. 打开命令提示符（CMD）或您习惯使用的命令行工具，并通过cd命令切换到刚才创建的文件夹路径。例如，如果您的文件夹名称是"
   GameProject"，并保存在"C"盘，那么您需要在命令行中输入`cd C:/GameProject` 完成路径切换。

3. 接下来，我们将要克隆下列Github项目到您的本地文件夹，依次在命令行中输入以下命令：

   ```
   git clone https://github.com/GameFrameX/GameFrameX.git
   git clone https://github.com/GameFrameX/GameFrameX.Server.git ./GameFrameX/Server
   git clone https://github.com/GameFrameX/GameFrameX.Tools.git ./GameFrameX/Tools
   git clone https://github.com/GameFrameX/GameFrameX.Unity.git ./GameFrameX/Unity
   ```

   当您输入完上述命令后，按Enter键执行。等待全部下载完成。

4. 下一步，打开"Tools"项目并执行编译操作。这个项目的作用是导出协议，这一步很重要，别忘记这步。

5. 最后，打开"Unity"项目以及"Server"，只要运行这两个项目，您就可以开始使用了。

import React, { useState } from 'react';
import {
  Cpu, Monitor, Network, Database, Settings, Code2,
  Activity, CheckCircle2, Clock, ArrowRight, Zap, Server,
  Eye, Move, ShieldAlert, Wifi, Box, ScanLine,
  BookOpen, X, ListTodo, Target, Terminal, Wrench,
  Presentation, FileCheck, PlayCircle,
  Lightbulb, HelpCircle, Users, Flag, MessageCircle, ClipboardCheck
} from 'lucide-react';

// --- 自定义 CSS 动画样式 ---
const customStyles = `
  @keyframes blink { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-3px); } 100% { transform: translateY(0px); } }
  @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.2); opacity: 0; } }
  @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes draw-line { 0% { stroke-dashoffset: 100; } 100% { stroke-dashoffset: 0; } }
  
  /* Modal Animation */
  @keyframes modal-in { from { opacity: 0; transform: scale(0.98) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  .animate-blink { animation: blink 2s infinite; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  .animate-spin-slow { animation: spin-slow 8s linear infinite; }
  .animate-modal-in { animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  
  /* Scrollbar hide */
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

// --- BOPPPS 教学环节微动画组件 ---
const SegmentIcon = ({ type }) => {
  switch (type) {
    case 'bridge': // 引入 (Bridge)
      return (
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 ring-2 ring-pink-50">
          <Lightbulb size={16} className="animate-float" />
        </div>
      );
    case 'objective': // 目标 (Objective)
      return (
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 ring-2 ring-blue-50">
          <Target size={16} />
        </div>
      );
    case 'pre-assessment': // 摸底 (Pre-assessment)
      return (
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 ring-2 ring-yellow-50">
          <HelpCircle size={16} />
        </div>
      );
    case 'participatory': // 参与式学习 (Participatory Learning) - 核心
      return (
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 ring-2 ring-indigo-50">
          <Users size={16} className="animate-pulse" />
        </div>
      );
    case 'post-assessment': // 课后测验 (Post-assessment)
      return (
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 ring-2 ring-orange-50">
          <ClipboardCheck size={16} />
        </div>
      );
    case 'summary': // 总结 (Summary)
      return (
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 ring-2 ring-green-50">
          <Flag size={16} />
        </div>
      );
    default:
      return <div className="w-8 h-8 bg-slate-100 rounded-full"></div>;
  }
};

const BopLabel = ({ type }) => {
  const labels = {
    'bridge': 'B - 课程引入',
    'objective': 'O - 学习目标',
    'pre-assessment': 'P - 课前摸底',
    'participatory': 'P - 参与式学习',
    'post-assessment': 'P - 课后测验',
    'summary': 'S - 总结归纳'
  };
  const colors = {
    'bridge': 'text-pink-600 bg-pink-50 border-pink-100',
    'objective': 'text-blue-600 bg-blue-50 border-blue-100',
    'pre-assessment': 'text-yellow-600 bg-yellow-50 border-yellow-100',
    'participatory': 'text-indigo-600 bg-indigo-50 border-indigo-100',
    'post-assessment': 'text-orange-600 bg-orange-50 border-orange-100',
    'summary': 'text-green-600 bg-green-50 border-green-100'
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${colors[type] || 'text-slate-500'}`}>
      {labels[type]}
    </span>
  );
};

// --- 深度扩充后的课程数据 (BOPPPS 模型 - 45分钟版) ---
const courseModules = [
  {
    id: 1,
    title: "PLC 逻辑控制基础",
    hours: 4,
    icon: <Cpu className="w-6 h-6" />,
    original: { desc: "了解 PLC 硬件结构，学习梯形图编程，实现起保停、正反转等基本逻辑。", tag: "原理认知" },
    enriched: {
      desc: "自动化产线启停逻辑设计。引入模块化编程思想 (FB/FC)，规范变量命名 (IEC 61131-3)，实现带故障复位的标准电机控制块。",
      tag: "标准化编程",
      details: ["IEC 61131-3 标准", "模块化编程 (FB)", "状态机逻辑"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "硬件组态与标准规范",
        segments: [
          { time: "00-03", type: "bridge", title: "乱码的代价", desc: "视频展示：某工厂因 PLC 变量命名混乱导致停机检修 3 天的真实案例，引发对‘规范’的重视。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "1. 能复述 S7-1200 硬件架构；2. 能运用 IEC 61131-3 匈牙利命名法命名变量。" },
          { time: "05-10", type: "pre-assessment", title: "找茬游戏", desc: "展示一段杂乱无章的代码截图，请学生快速圈出 3 个不规范之处（抢答）。" },
          { time: "10-35", type: "participatory", title: "小组实战：虚拟装配", desc: "两人一组，在 TIA Portal 中完成一套 PLC 站点的硬件选型与组态，互相检查 IP 设置。" },
          { time: "35-42", type: "post-assessment", title: "命名接龙", desc: "教师给出物理元件（如：启动按钮），学生接龙回答标准变量名（如：tag_bStart）。" },
          { time: "42-45", type: "summary", title: "思维导图", desc: "请一名学生上台画出本节课的硬件连接拓扑图，其他同学补充纠正。" }
        ]
      },
      {
        hour: 2,
        topic: "模块化编程 (FC/FB)",
        segments: [
          { time: "00-03", type: "bridge", title: "乐高积木的启示", desc: "展示用乐高积木搭建复杂城堡的过程，类比 PLC 模块化编程的高效复用性。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "1. 理解 FC 与 FB 的区别；2. 能创建带参数接口的电机控制功能块。" },
          { time: "05-10", type: "pre-assessment", title: "投票", desc: "‘如果我有 100 台电机，需要写 100 段代码吗？’ 统计学生直觉选项。" },
          { time: "10-35", type: "participatory", title: "演练：万能电机块", desc: "教师演示定义 Input/Output 接口；学生动手编写一个‘通吃’所有电机的 FB 块，并在 OB1 中调用 3 次。" },
          { time: "35-42", type: "post-assessment", title: "Debug 挑战", desc: "教师下发一段有 Bug 的 FB 调用程序（背景数据块冲突），学生限时修复。" },
          { time: "42-45", type: "summary", title: "口诀总结", desc: "师生共同总结 FC/FB 选择口诀：‘带记忆用 FB，纯逻辑用 FC’。" }
        ]
      },
      {
        hour: 3,
        topic: "状态机逻辑设计",
        segments: [
          { time: "00-03", type: "bridge", title: "自动贩卖机", desc: "分析自动贩卖机‘投币->选货->出货’的流程，引入状态机概念。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "掌握 SCL 语言中的 CASE 语句；能绘制单按钮启停的状态流转图。" },
          { time: "05-10", type: "pre-assessment", title: "流程图填空", desc: "PPT 展示缺损的状态跳转图，学生补充缺失的跳转条件。" },
          { time: "10-35", type: "participatory", title: "编程：SCL 魔法", desc: "抛弃梯形图互锁，学生尝试使用 CASE OF 语句编写 Init->Ready->Run 逻辑，体验代码的整洁。" },
          { time: "35-42", type: "post-assessment", title: "逻辑验证", desc: "模拟‘急停按下’信号，检查程序是否能从任意状态强制跳转至 Error 状态。" },
          { time: "42-45", type: "summary", title: "金句分享", desc: "学生分享使用状态机编程的体会（如：‘逻辑更清晰了’）。" }
        ]
      },
      {
        hour: 4,
        topic: "仿真与标准化验收",
        segments: [
          { time: "00-03", type: "bridge", title: "虚拟双胞胎", desc: "播放西门子 PLCSIM Advanced 数字孪生视频，激发仿真兴趣。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "熟练使用 PLCSIM 监控表；完成本周课程设计的标准化文档。" },
          { time: "05-10", type: "pre-assessment", title: "操作复现", desc: "随机抽取学生演示如何强制修改变量值。" },
          { time: "10-35", type: "participatory", title: "互评互改", desc: "同桌互换代码，根据‘代码规范检查表’（注释率、命名、缩进）进行打分和批注。" },
          { time: "35-42", type: "post-assessment", title: "结业答辩", desc: "每组选代表展示最终的电机控制效果，回答教师关于故障复位逻辑的提问。" },
          { time: "42-45", type: "summary", title: "知识图谱", desc: "教师展示本周知识点全景图，勾勒下周‘智能传感’的预习要点。" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "智能传感与 IO-Link 技术",
    hours: 4,
    icon: <ScanLine className="w-6 h-6" />,
    original: { desc: "使用普通开关量传感器和两线制变送器进行简单的信号采集。", tag: "硬接线" },
    enriched: {
      desc: "智能感知层构建。配置 IO-Link 主站与智能光电传感器，实时读取传感器参数（如脏污报警、距离数值），实现预测性维护基础。",
      tag: "智能感知",
      details: ["IO-Link 协议配置", "传感器参数化", "预测性维护数据"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "IO-Link 协议原理",
        segments: [
          { time: "00-03", type: "bridge", title: "最后一公里的痛", desc: "展示传统模拟量传感器受干扰波动、断线无法自诊断的痛点。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "1. 理解 IO-Link 数字通讯优势；2. 掌握 IODD 文件导入方法。" },
          { time: "05-10", type: "pre-assessment", title: "连线题", desc: "区分 IO-Link 三线制（L+, L-, C/Q）的定义。" },
          { time: "10-35", type: "participatory", title: "实操：设备上线", desc: "学生在 TIA 中配置 ET200SP 主站，下载 IODD，并让传感器在软件中‘现身’。" },
          { time: "35-42", type: "post-assessment", title: "故障排查", desc: "故意给错误的 Port 配置，学生需通过诊断信息修正错误。" },
          { time: "42-45", type: "summary", title: "对比表", desc: "学生填写‘传统 IO vs IO-Link’对比表格。" }
        ]
      },
      {
        hour: 2,
        topic: "智能参数化配置",
        segments: [
          { time: "00-03", type: "bridge", title: "变色龙实验", desc: "演示传感器根据被测物颜色自动切换检测参数的神奇效果。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "能使用 S7-PCT 工具在线修改传感器参数。" },
          { time: "05-10", type: "pre-assessment", title: "头脑风暴", desc: "‘为什么需要在 PLC 运行时修改传感器参数？’" },
          { time: "10-35", type: "participatory", title: "角色扮演", desc: "学生扮演‘柔性产线工程师’，编写程序：当生产‘黑色产品’时，自动调高传感器灵敏度。" },
          { time: "35-42", type: "post-assessment", title: "实测验收", desc: "放置不同颜色工件，验证传感器参数是否自动切换成功。" },
          { time: "42-45", type: "summary", title: "要点回顾", desc: "强调参数备份与恢复（Data Storage）机制。" }
        ]
      },
      {
        hour: 3,
        topic: "非周期性数据交互",
        segments: [
          { time: "00-03", type: "bridge", title: "体检报告", desc: "类比人去医院体检，展示传感器内部的‘健康数据’（温度、运行时间）。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "掌握 RDREC 指令；能读取 ISDU 非周期数据。" },
          { time: "05-10", type: "pre-assessment", title: "索引查询", desc: "查阅手册，找到‘厂商 ID’和‘序列号’对应的 Index 编号。" },
          { time: "10-35", type: "participatory", title: "编程挑战", desc: "编写功能块，读取传感器的‘镜头脏污程度’百分比，并在 HMI 上显示进度条。" },
          { time: "35-42", type: "post-assessment", title: "数据核对", desc: "对比 PLC 读到的序列号与传感器铭牌是否一致。" },
          { time: "42-45", type: "summary", title: "价值升华", desc: "讨论这些数据对‘预测性维护’的意义。" }
        ]
      },
      {
        hour: 4,
        topic: "综合故障诊断",
        segments: [
          { time: "00-03", type: "bridge", title: "急诊室故事", desc: "讲述设备突然停机且无报警提示导致的生产事故。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "能利用 OB82 捕获诊断中断；实现传感器断线报警。" },
          { time: "05-10", type: "pre-assessment", title: "原理问答", desc: "‘拔掉传感器，PLC 怎么知道是哪一个口断了？’" },
          { time: "10-35", type: "participatory", title: "破坏性实验", desc: "学生人为制造断线、短路、脏污遮挡，编写 PLC 逻辑自动弹出具体的中文报警信息。" },
          { time: "35-42", type: "post-assessment", title: "盲测", desc: "教师随机制造一个故障，学生需在 2 分钟内通过 HMI 报出故障原因。" },
          { time: "42-45", type: "summary", title: "本周结语", desc: "学生轮流用一句话总结智能传感器的‘智能’体现在哪里。" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "过程控制与 PID 算法",
    hours: 4,
    icon: <Activity className="w-6 h-6" />,
    original: { desc: "实现简单的模拟量输入输出，控制水箱水位。", tag: "开环控制" },
    enriched: {
      desc: "恒温恒压供水系统。深入讲解 PID 参数整定（P/I/D 作用），引入前馈控制抗干扰，实现高精度的闭环过程控制。",
      tag: "闭环算法",
      details: ["PID 参数整定", "抗积分饱和", "PWM 脉宽调制"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "PID 算法核心",
        segments: [
          { time: "00-03", type: "bridge", title: "无人驾驶", desc: "通过无人驾驶汽车保持车道居中的视频，引出‘反馈控制’概念。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解 P、I、D 三个参数的物理意义；掌握模拟量标定方法。" },
          { time: "05-10", type: "pre-assessment", title: "直觉测试", desc: "‘如果水温太低，应该加大还是减小加热功率？’（正/反作用判断）" },
          { time: "10-35", type: "participatory", title: "仿真实验", desc: "使用 Matlab 或 TIA 仿真对象，分别单独调节 P、I、D 参数，观察波形变化，记录特性。" },
          { time: "35-42", type: "post-assessment", title: "波形配对", desc: "给出 4 张响应曲线图（发散、振荡、慢、稳），匹配对应的参数问题。" },
          { time: "42-45", type: "summary", title: "口诀记忆", desc: "总结 PID 调参口诀：‘参数整定找最佳，从小到大顺序查…’" }
        ]
      },
      {
        hour: 2,
        topic: "工艺对象 (TO) 组态",
        segments: [
          { time: "00-03", type: "bridge", title: "手机向导", desc: "类比新手机开机向导，介绍 TIA Portal 中的 PID 向导功能。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "能使用 PID_Compact 工艺对象完成恒压供水回路组态。" },
          { time: "05-10", type: "pre-assessment", title: "单位换算", desc: "将压力传感器 4-20mA 信号换算为 0-10Bar 压力值。" },
          { time: "10-35", type: "participatory", title: "项目组态", desc: "学生跟随向导步骤，配置输入输出标定、控制限值及反积分饱和功能。" },
          { time: "35-42", type: "post-assessment", title: "检查清单", desc: "同伴互查组态配置，确认是否启用了‘手动/自动’切换功能。" },
          { time: "42-45", type: "summary", title: "难点解析", desc: "教师重点解释‘Anti-windup’（抗积分饱和）的必要性。" }
        ]
      },
      {
        hour: 3,
        topic: "参数自整定",
        segments: [
          { time: "00-03", type: "bridge", title: "AI 调参", desc: "展示 PID 自整定功能如何像 AI 一样自动寻找最优解。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "掌握预调节 (Pre-tuning) 和精确调节 (Fine-tuning) 的操作与区别。" },
          { time: "05-10", type: "pre-assessment", title: "条件判断", desc: "‘系统处于稳态时，应该用预调节还是精确调节？’" },
          { time: "10-35", type: "participatory", title: "实操演练", desc: "启动自整定，学生实时观察 Trend View 曲线，记录参数 P, I, D 的变化数值。" },
          { time: "35-42", type: "post-assessment", title: "效果评估", desc: "对比自整定前后的系统响应速度和稳定性，计算调节时间 Ts。" },
          { time: "42-45", type: "summary", title: "经验分享", desc: "讨论自整定失败的可能原因（如：干扰太大、限值设置不合理）。" }
        ]
      },
      {
        hour: 4,
        topic: "扰动测试与优化",
        segments: [
          { time: "00-03", type: "bridge", title: "淋浴忽冷忽热", desc: "从洗澡水温不稳定的生活痛点切入，讨论如何抗干扰。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解前馈控制原理；能针对负载扰动进行参数微调。" },
          { time: "05-10", type: "pre-assessment", title: "方案设计", desc: "‘如果有人突然打开水龙头，怎么能让水压掉得少一点？’" },
          { time: "10-35", type: "participatory", title: "压力测试", desc: "人为施加阶跃干扰（模拟阀门突然全开），学生手动微调 PID 参数，力求超调量 < 5%。" },
          { time: "35-42", type: "post-assessment", title: "性能PK", desc: "全班分组竞赛，看哪一组的 PID 控制器在干扰下恢复稳态最快。" },
          { time: "42-45", type: "summary", title: "结课陈词", desc: "学生总结：‘闭环控制是自动化的灵魂’。" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "HMI 人机交互界面设计",
    hours: 4,
    icon: <Monitor className="w-6 h-6" />,
    original: { desc: "绘制简单的按钮和指示灯，显示数值。", tag: "基础绘图" },
    enriched: {
      desc: "工业级 UI/UX 设计。设计符合 ISA-101 标准的高性能 HMI，包含配方管理系统、多语言切换及审计追踪功能。",
      tag: "用户体验",
      details: ["ISA-101 设计规范", "配方管理 (Recipe)", "多语言支持"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "ISA-101 设计美学",
        segments: [
          { time: "00-03", type: "bridge", title: "糟糕的 UI", desc: "展示几张花花绿绿、令人眼花缭乱的传统工业屏界面，引发吐槽。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解高性能 HMI 设计原则（灰度背景、情境感知）；掌握模板制作。" },
          { time: "05-10", type: "pre-assessment", title: "审美测试", desc: "对比两张界面，投票选出更符合人机工程学的一张。" },
          { time: "10-35", type: "participatory", title: "界面重构", desc: "学生领取一个‘丑陋’的旧界面，运用 ISA-101 标准进行重新设计，建立统一的导航栏和母版。" },
          { time: "35-42", type: "post-assessment", title: "作品互评", desc: "互相点评同桌的设计，指出是否遵循了‘异常状态用亮色’的原则。" },
          { time: "42-45", type: "summary", title: "设计规范", desc: "归纳出 UI 设计三要素：清晰、一致、高效。" }
        ]
      },
      {
        hour: 2,
        topic: "配方管理系统",
        segments: [
          { time: "00-03", type: "bridge", title: "奶茶店配方", desc: "以奶茶店不同口味（糖、冰、茶）的配方单为例，引入工业配方概念。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解 Record 与 Element 关系；实现配方上传下载功能。" },
          { time: "05-10", type: "pre-assessment", title: "概念辨析", desc: "‘配方是存在屏里还是存在 PLC 里？’ 辨析数据流向。" },
          { time: "10-35", type: "participatory", title: "配方开发", desc: "创建‘产品A/B/C’三种加工参数配方，在 HMI 上实现新建、保存、删除及下发至 PLC 的完整闭环。" },
          { time: "35-42", type: "post-assessment", title: "功能验证", desc: "切换配方后，检查 PLC 内部 DB 块数据是否瞬间更新。" },
          { time: "42-45", type: "summary", title: "注意事项", desc: "强调配方同步时的‘握手信号’重要性。" }
        ]
      },
      {
        hour: 3,
        topic: "报警与审计追踪",
        segments: [
          { time: "00-03", type: "bridge", title: "谁动了我的参数", desc: "讲述一起因误操作修改参数导致废品的事故，引出权限与审计的重要性。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "实现三级用户权限管理；配置报警归档与审计追踪。" },
          { time: "05-10", type: "pre-assessment", title: "权限划分", desc: "讨论：‘哪些操作需要管理员权限？哪些只需要操作员权限？’" },
          { time: "10-35", type: "participatory", title: "系统加固", desc: "为关键按钮添加权限锁，配置 User Administration；启用 Audit Trail 记录所有操作日志。" },
          { time: "35-42", type: "post-assessment", title: "黑客行动", desc: "学生尝试在未登录状态下修改参数，验证系统安全性。" },
          { time: "42-45", type: "summary", title: "安全意识", desc: "总结工业现场账号管理的最佳实践。" }
        ]
      },
      {
        hour: 4,
        topic: "高级脚本与动态化",
        segments: [
          { time: "00-03", type: "bridge", title: "动起来的工厂", desc: "展示带有流体动画、旋转风扇的高端监控画面，激发创作欲。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "能编写 VB/C 脚本实现复杂逻辑；实现多语言一键切换。" },
          { time: "05-10", type: "pre-assessment", title: "脚本阅读", desc: "阅读一段简单的 VB 脚本，解释其功能。" },
          { time: "10-35", type: "participatory", title: "创意编程", desc: "编写脚本实现：根据当前时间自动切换‘白天/黑夜’模式；实现液体在管道中流动的动态效果。" },
          { time: "35-42", type: "post-assessment", title: "国际化测试", desc: "一键切换界面语言（中/英/德），检查文本是否溢出或乱码。" },
          { time: "42-45", type: "summary", title: "本周展示", desc: "每组展示最终的 HMI 作品，全班投票选出‘最佳 UX 设计奖’。" }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "工业以太网 PROFINET 组网",
    hours: 4,
    icon: <Wifi className="w-6 h-6" />,
    original: { desc: "简单的串口通讯或点对点连接。", tag: "串行通讯" },
    enriched: {
      desc: "高性能工业网络构建。搭建 PROFINET 环网（MRP 介质冗余），配置智能交换机，分析网络负载与实时性等级 (RT/IRT)。",
      tag: "高速网络",
      details: ["PROFINET RT/IRT", "MRP 环网冗余", "网络拓扑诊断"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "网络基础与拓扑",
        segments: [
          { time: "00-03", type: "bridge", title: "高速公路", desc: "将以太网比作高速公路，RT 数据是普通车，IRT 数据是警车，解释实时性。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解 RT 与 IRT 区别；掌握拓扑视图 (Topology View) 的组态。" },
          { time: "05-10", type: "pre-assessment", title: "连连看", desc: "在白板上画出设备的物理连接，学生在 TIA 软件中进行对应连接。" },
          { time: "10-35", type: "participatory", title: "黑科技体验", desc: "组态拓扑后，更换一台无 SD 卡的新设备，体验‘设备名称自动分配’功能，无需电脑介入。" },
          { time: "35-42", type: "post-assessment", title: "原理解析", desc: "学生尝试解释为什么配置了拓扑就能自动分配 IP 和名称（LLDP 协议）。" },
          { time: "42-45", type: "summary", title: "拓扑价值", desc: "总结拓扑视图在故障定位中的作用。" }
        ]
      },
      {
        hour: 2,
        topic: "MRP 介质冗余",
        segments: [
          { time: "00-03", type: "bridge", title: "断网不亦乐乎", desc: "播放一段视频：网线断了，但机器照常运行。引出‘冗余’概念。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解 MRP 环网原理；配置 MRP Manager 与 Client。" },
          { time: "05-10", type: "pre-assessment", title: "路径分析", desc: "‘如果环网断了一处，数据怎么走？’ 画图推演。" },
          { time: "10-35", type: "participatory", title: "环网搭建", desc: "使用 SCALANCE 交换机和 PLC 搭建物理环网，配置 MRP 域，观察端口状态。" },
          { time: "35-42", type: "post-assessment", title: "拔线测试", desc: "在系统运行时突然拔掉一根网线，通过 HMI 观察通讯是否中断（要求切换时间 <200ms）。" },
          { time: "42-45", type: "summary", title: "可靠性分级", desc: "对比 MRP (200ms) 与 HRP/PRP (0ms) 的适用场景。" }
        ]
      },
      {
        hour: 3,
        topic: "网络诊断编程",
        segments: [
          { time: "00-03", type: "bridge", title: "全科医生", desc: "网络故障像隐形病，需要‘诊断医生’。介绍 RSE (Report System Error) 功能。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "能组态 RSE 自动生成报警；能读取交换机端口诊断数据。" },
          { time: "05-10", type: "pre-assessment", title: "报警阅读", desc: "展示一条十六进制的网络错误代码，查表解读含义。" },
          { time: "10-35", type: "participatory", title: "自诊断系统", desc: "启用 PLC 系统诊断功能，无需编写一行代码，实现在 HMI 上显示‘端口 X 断开’的中文报警。" },
          { time: "35-42", type: "post-assessment", title: "SNMP 探秘", desc: "使用指令读取交换机光纤端口的衰耗值 (dBm)，判断光纤质量。" },
          { time: "42-45", type: "summary", title: "维护策略", desc: "总结如何变‘被动维修’为‘主动维护’。" }
        ]
      },
      {
        hour: 4,
        topic: "无线与远程接入",
        segments: [
          { time: "00-03", type: "bridge", title: "AGV 小车", desc: "展示 AGV 小车在工厂穿梭的视频，讨论其通讯方式（工业 WLAN）。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解 iPCF 快速漫游技术；掌握 NAT 网络地址转换配置。" },
          { time: "05-10", type: "pre-assessment", title: "IP 冲突", desc: "‘如果所有机器 IP 都一样，怎么连网？’ 引入 NAT 需求。" },
          { time: "10-35", type: "participatory", title: "网络隔离", desc: "配置 CP 模块的 NAT 功能，将设备内网 (192.168.0.x) 映射到工厂外网 (10.10.x.x)，实现隔离访问。" },
          { time: "35-42", type: "post-assessment", title: "Ping 测试", desc: "从外网 PC Ping 设备内网地址，验证 NAT 规则是否生效。" },
          { time: "42-45", type: "summary", title: "网络安全", desc: "简要提及工业防火墙与 VPN 的作用。" }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "机器视觉检测系统",
    hours: 4,
    icon: <Eye className="w-6 h-6" />,
    original: { desc: "人工目视检查或简单的颜色传感器。", tag: "人工质检" },
    enriched: {
      desc: "基于视觉的质量检测。配置智能相机，通过 PLC 触发拍照，实现二维码读取、OCR 字符识别及产品缺陷检测（OK/NG 分拣）。",
      tag: "视觉引导",
      details: ["图像定位", "OCR/二维码识别", "PLC-Cam 通讯"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "成像光学基础",
        segments: [
          { time: "00-03", type: "bridge", title: "人眼 vs 机器眼", desc: "展示高速流水线上的模糊产品，对比机器视觉的‘火眼金睛’。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解打光原理（明场/暗场）；掌握曝光、增益调节技巧。" },
          { time: "05-10", type: "pre-assessment", title: "光源选型", desc: "‘检测金属表面的划痕，应该用高角度光还是低角度光？’" },
          { time: "10-35", type: "participatory", title: "光影魔术", desc: "分组实验：使用不同光源（环形、同轴、背光）照射同一物体，调节相机曝光参数，直到获取最清晰的特征图像。" },
          { time: "35-42", type: "post-assessment", title: "畸变校正", desc: "使用标定板进行图像校准，将像素单位转换为毫米单位。" },
          { time: "42-45", type: "summary", title: "成像法则", desc: "总结：‘好的图像是成功的一半’。" }
        ]
      },
      {
        hour: 2,
        topic: "视觉工具组态",
        segments: [
          { time: "00-03", type: "bridge", title: "找不同", desc: "玩‘大家来找茬’游戏，引出图像处理算法（图案匹配、边缘查找）。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "熟练使用 Vision Composer 配置读码、定位、缺陷检测工具。" },
          { time: "05-10", type: "pre-assessment", title: "工具匹配", desc: "‘检测瓶盖有没有拧紧，用什么工具？’" },
          { time: "10-35", type: "participatory", title: "算法实战", desc: "配置 DataMatrix 读码器读取序列号；配置‘像素计数’工具检测产品表面是否有缺损（NG）。" },
          { time: "35-42", type: "post-assessment", title: "鲁棒性测试", desc: "旋转、移动产品，验证视觉工具是否依然能稳定识别。" },
          { time: "42-45", type: "summary", title: "阈值设定", desc: "讨论如何平衡‘漏检’与‘误检’。" }
        ]
      },
      {
        hour: 3,
        topic: "PLC-Vision 通讯",
        segments: [
          { time: "00-03", type: "bridge", title: "跨界对话", desc: "‘只会拍照没有用，得告诉机械手去哪抓。’ 引入通讯需求。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "掌握 PLC 与相机的手拉手信号时序 (Trigger/Busy/Done)。" },
          { time: "05-10", type: "pre-assessment", title: "时序图排序", desc: "将打乱的通讯时序步骤重新排序。" },
          { time: "10-35", type: "participatory", title: "数据握手", desc: "定义 UDT 数据结构，编写 PLC 程序触发相机拍照，并解析相机返回的 X/Y 坐标和评分数据。" },
          { time: "35-42", type: "post-assessment", title: "实时联调", desc: "PLC 给出触发信号，HMI 实时显示相机读取到的二维码字符串。" },
          { time: "42-45", type: "summary", title: "通讯协议", desc: "回顾 PROFINET 报文结构。" }
        ]
      },
      {
        hour: 4,
        topic: "闭环分拣控制",
        segments: [
          { time: "00-03", type: "bridge", title: "垃圾分类", desc: "观看智能垃圾分拣视频，讨论其背后的控制逻辑。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "实现‘视觉判定 -> 队列追踪 -> 定点剔除’的完整逻辑。" },
          { time: "05-10", type: "pre-assessment", title: "延时计算", desc: "‘如果皮带速度 1m/s，剔除口距离相机 2m，延时多久剔除？’" },
          { time: "10-35", type: "participatory", title: "全自动产线", desc: "编写队列移位寄存器逻辑，实现多产品并发检测与精准剔除废品。" },
          { time: "35-42", type: "post-assessment", title: "OEE 统计", desc: "在 HMI 上显示当班产量、合格率及 OEE 指标。" },
          { time: "42-45", type: "summary", title: "本周验收", desc: "分组演示视觉检测分拣系统，教师进行评分。" }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "多轴运动控制技术",
    hours: 4,
    icon: <Move className="w-6 h-6" />,
    original: { desc: "控制电机简单的转动和停止。", tag: "开关控制" },
    enriched: {
      desc: "XY 双轴机械手控制。遵循 PLCopen Motion Control 规范，实现伺服电机的回原点、绝对定位、插补运动及电子凸轮功能。",
      tag: "精密控制",
      details: ["PLCopen 规范", "伺服定位", "直线/圆弧插补"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "伺服系统配置",
        segments: [
          { time: "00-03", type: "bridge", title: "机械舞", desc: "播放机器人精准同步舞蹈视频，引出‘伺服控制’的精密性。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解三环控制（位置/速度/电流）；掌握轴工艺对象 (TO) 组态。" },
          { time: "05-10", type: "pre-assessment", title: "参数计算", desc: "‘螺距 5mm，减速比 1:10，电机转一圈负载走多少？’" },
          { time: "10-35", type: "participatory", title: "虚拟调试", desc: "在 TIA 中创建定位轴，配置机械参数，使用 Control Panel 进行电机正反转点动测试。" },
          { time: "35-42", type: "post-assessment", title: "驱动器联调", desc: "使用 V-Assistant 软件连接真实驱动器，识别电机参数。" },
          { time: "42-45", type: "summary", title: "闭环原理", desc: "总结编码器反馈在伺服定位中的作用。" }
        ]
      },
      {
        hour: 2,
        topic: "单轴运动编程",
        segments: [
          { time: "00-03", type: "bridge", title: "回家的路", desc: "‘如果不知道当前在哪里，怎么去目的地？’ 引出回原点 (Homing) 重要性。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "掌握 PLCopen 标准指令 (Power, Reset, Home, Jog)。" },
          { time: "05-10", type: "pre-assessment", title: "状态机", desc: "判断‘轴报错后，能否直接启动运行？’（需先 Reset）。" },
          { time: "10-35", type: "participatory", title: "积木编程", desc: "拖拽 MC_Power 等指令块，编写完整的单轴控制程序，调试主动回零序列（原点开关+Z相）。" },
          { time: "35-42", type: "post-assessment", title: "找原点", desc: "修改回原点模式（仅限位开关/限位+零脉冲），观察动作区别。" },
          { time: "42-45", type: "summary", title: "标准规范", desc: "强调 PLCopen 状态机管理的必要性。" }
        ]
      },
      {
        hour: 3,
        topic: "多轴协同控制",
        segments: [
          { time: "00-03", type: "bridge", title: "写字机器人", desc: "展示 XY 绘图仪写字过程，引出多轴插补概念。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "掌握绝对定位 (MoveAbsolute)；实现简单的 XY 轨迹规划。" },
          { time: "05-10", type: "pre-assessment", title: "坐标系", desc: "‘绝对运动和相对运动的区别是什么？’" },
          { time: "10-35", type: "participatory", title: "画矩形", desc: "编写 SCL 序列控制，指挥 XY 双轴机械手走出一个完美的矩形轨迹（(0,0)->(100,0)->(100,50)->(0,50)->(0,0)）。" },
          { time: "35-42", type: "post-assessment", title: "平滑度", desc: "调整 Jerk (加加速度) 参数，观察机械手起停时的抖动情况。" },
          { time: "42-45", type: "summary", title: "路径优化", desc: "讨论如何减少路径中的停顿时间。" }
        ]
      },
      {
        hour: 4,
        topic: "高级插补功能",
        segments: [
          { time: "00-03", type: "bridge", title: "飞剪", desc: "观看飞剪切管机视频，‘切刀怎么知道管子跑多快？’ 引入同步控制。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解电子齿轮 (GearIn) 原理；会使用 Trace 追踪轨迹。" },
          { time: "05-10", type: "pre-assessment", title: "同步比", desc: "‘主轴转 1 圈，从轴转 2 圈，齿轮比是多少？’" },
          { time: "10-35", type: "participatory", title: "同步跟随", desc: "编写 GearIn 程序，让 Y 轴实时跟随 X 轴的速度运动；使用 Trace 功能抓取位置/速度曲线。" },
          { time: "35-42", type: "post-assessment", title: "误差分析", desc: "分析 Trace 曲线中的跟随误差 (Following Error)，尝试优化增益。" },
          { time: "42-45", type: "summary", title: "运动之美", desc: "总结运动控制的核心：精度、速度、稳定性。" }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "分布式 I/O 系统集成",
    hours: 4,
    icon: <Network className="w-6 h-6" />,
    original: { desc: "主从站简单的信号映射。", tag: "远程IO" },
    enriched: {
      desc: "模块化产线集成。使用分布式 I/O 模块 (ET200) 扩展控制范围，设计主站宕机后的故障安全 (Fail-Safe) 输出策略。",
      tag: "系统扩展",
      details: ["GSD 文件配置", "拓扑自动发现", "断线保持策略"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "分布式架构",
        segments: [
          { time: "00-03", type: "bridge", title: "蜘蛛网", desc: "展示传统集中式控制柜背后恐怖的接线图，对比分布式 I/O 的清爽。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解分布式 I/O 优势；掌握 ET200SP 硬件组装与组态。" },
          { time: "05-10", type: "pre-assessment", title: "成本计算", desc: "‘拉 100 根信号线 vs 拉 1 根网线，成本差多少？’" },
          { time: "10-35", type: "participatory", title: "积木搭建", desc: "学生亲手组装 IM 接口模块、BaseUnit 和电子模块；在 TIA 中完成站点组态。" },
          { time: "35-42", type: "post-assessment", title: "白板配对", desc: "正确匹配白色底座与灰色底座的用途（开启新电位组 vs 延续电位）。" },
          { time: "42-45", type: "summary", title: "选型法则", desc: "总结分布式 I/O 选型要点。" }
        ]
      },
      {
        hour: 2,
        topic: "智能从站 (I-Device)",
        segments: [
          { time: "00-03", type: "bridge", title: "套娃", desc: "‘PLC 也可以是别人的从站？’ 介绍 I-Device 智能从站概念。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "掌握多 PLC 间的 I-Device 通讯配置；理解传输区映射。" },
          { time: "05-10", type: "pre-assessment", title: "架构图", desc: "画出主站 PLC 与智能从站 PLC 的主从关系图。" },
          { time: "10-35", type: "participatory", title: "大脑互联", desc: "将两台 PLC 互联，一台作为主控，另一台作为智能 I/O，配置 Transfer Area 实现无需编程的数据映射。" },
          { time: "35-42", type: "post-assessment", title: "延迟测试", desc: "测试 I-Device 通讯的信号延迟，对比传统耦合器方案。" },
          { time: "42-45", type: "summary", title: "应用场景", desc: "讨论模块化机器（如包装机）中 I-Device 的应用。" }
        ]
      },
      {
        hour: 3,
        topic: "故障安全行为",
        segments: [
          { time: "00-03", type: "bridge", title: "失控的阀门", desc: "‘如果网线断了，加料阀门是保持打开还是自动关闭？’ 引出故障安全策略。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "掌握‘断网输出行为’的三种策略（置零/保持/替代值）。" },
          { time: "05-10", type: "pre-assessment", title: "风险评估", desc: "分析加热器在断网时保持开启的后果。" },
          { time: "10-35", type: "participatory", title: "断网演习", desc: "配置 ET200SP 输出模块的断网行为为‘输出替代值’；物理拔线，验证输出是否按预期动作。" },
          { time: "35-42", type: "post-assessment", title: "策略辩论", desc: "分组讨论：‘风机断网时应该停机还是保持运行？’" },
          { time: "42-45", type: "summary", title: "安全第一", desc: "总结：‘失效必须是安全的 (Fail-Safe)’。" }
        ]
      },
      {
        hour: 4,
        topic: "系统维护与诊断",
        segments: [
          { time: "00-03", type: "bridge", title: "远程诊疗", desc: "‘不用去现场，怎么知道哪个模块坏了？’ 介绍 Web Server。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "熟练使用 Web Server 查看模块状态；掌握热插拔操作规范。" },
          { time: "05-10", type: "pre-assessment", title: "热插拔", desc: "‘带电拔模块会不会烧坏 PLC？’" },
          { time: "10-35", type: "participatory", title: "带电维护", desc: "启用 Web Server；在通电状态下更换损坏的 I/O 模块（需预先配置 OB83），观察系统反应。" },
          { time: "35-42", type: "post-assessment", title: "日志分析", desc: "导出诊断缓冲区日志，翻译 Event ID 16#02:395C 的含义。" },
          { time: "42-45", type: "summary", title: "易维护性", desc: "总结如何设计易于维护的自动化系统。" }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "工业功能安全 (Safety)",
    hours: 4,
    icon: <ShieldAlert className="w-6 h-6" />,
    original: { desc: "传统的急停按钮硬接线。", tag: "继电器安全" },
    enriched: {
      desc: "基于 PROFIsafe 的安全控制。配置安全 PLC 与安全 I/O，设计安全光幕与急停逻辑，达到 SIL2/PLd 安全等级。",
      tag: "功能安全",
      details: ["PROFIsafe 协议", "安全逻辑编程", "SIL/PL 等级评估"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "功能安全基础",
        segments: [
          { time: "00-03", type: "bridge", title: "泰坦尼克", desc: "从事故案例引入风险降低概念，介绍 PL (Performance Level) 和 SIL 等级。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "区分标准 PLC 与安全 PLC；理解冗余 (Redundancy) 机制。" },
          { time: "05-10", type: "pre-assessment", title: "找不同", desc: "对比黄色安全模块与白色标准模块的外观与功能差异。" },
          { time: "10-35", type: "participatory", title: "1oo2 评估", desc: "模拟双通道输入，讲解为什么‘两个传感器同时动作才算有效’；组态 F-CPU。" },
          { time: "35-42", type: "post-assessment", title: "等级计算", desc: "简单计算：一个急停按钮 + 一个安全接触器能达到什么 PL 等级？" },
          { time: "42-45", type: "summary", title: "安全公理", desc: "总结：‘安全不能靠软件保证，要靠硬件冗余和诊断’。" }
        ]
      },
      {
        hour: 2,
        topic: "PROFIsafe 组态",
        segments: [
          { time: "00-03", type: "bridge", title: "黑客帝国", desc: "‘如果有人篡改了急停信号怎么办？’ 介绍 PROFIsafe 协议的 CRC 校验与编号机制。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "掌握 F-Address 拨码设置；配置安全模块参数。" },
          { time: "05-10", type: "pre-assessment", title: "地址冲突", desc: "‘两个安全模块能不能用同一个 F-Address？’" },
          { time: "10-35", type: "participatory", title: "安全握手", desc: "在 TIA 中组态 F-DI/F-DQ，设置目标地址，物理拨码确认，消除‘模块未确认’报错。" },
          { time: "35-42", type: "post-assessment", title: "钝化演示", desc: "故意制造通道差异（短路其中一路），观察模块通道钝化现象。" },
          { time: "42-45", type: "summary", title: "协议层", desc: "回顾 PROFIsafe 是如何在标准以太网上实现安全通讯的。" }
        ]
      },
      {
        hour: 3,
        topic: "安全逻辑编程",
        segments: [
          { time: "00-03", type: "bridge", title: "黄色积木", desc: "展示 TIA Portal 中的黄色安全指令库 (Safety Lib)。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "会使用 ESTOP1 (急停)、SFDOOR (安全门) 等认证块编写逻辑。" },
          { time: "05-10", type: "pre-assessment", title: "复位机制", desc: "‘急停拍下后，拔起来机器就能跑吗？’（必须有 Ack 确认）。" },
          { time: "10-35", type: "participatory", title: "编写 Safety Main", desc: "在安全循环中断 OB 中编写急停与安全门逻辑，关联 F-IO 变量，实现‘拍急停->断输出->按复位->恢复’流程。" },
          { time: "35-42", type: "post-assessment", title: "防篡改", desc: "尝试在标准程序中强制安全变量，验证是否被系统拒绝。" },
          { time: "42-45", type: "summary", title: "分离原则", desc: "总结标准程序与安全程序的交互规则。" }
        ]
      },
      {
        hour: 4,
        topic: "安全验收测试",
        segments: [
          { time: "00-03", type: "bridge", title: "最后一道防线", desc: "介绍 FAT (Factory Acceptance Test) 中的安全验收环节。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "执行标准化的安全功能测试；生成并校验 F-Signature。" },
          { time: "05-10", type: "pre-assessment", title: "签名校验", desc: "‘为什么程序没改，但 Checksum 变了？’" },
          { time: "10-35", type: "participatory", title: "实战验收", desc: "按照测试用例，逐一测试急停、光幕、反馈回路 (EDM) 功能，记录测试结果。" },
          { time: "35-42", type: "post-assessment", title: "打印报告", desc: "生成安全程序的一致性报告，核对 F-Signature。" },
          { time: "42-45", type: "summary", title: "责任重于泰山", desc: "结束语：安全工程师的责任。" }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "SCADA 数据采集与监控",
    hours: 4,
    icon: <Database className="w-6 h-6" />,
    original: { desc: "PC 端简单的画面显示。", tag: "单机监控" },
    enriched: {
      desc: "工厂级数据中心。通过 ODBC/SQL 记录生产报表，配置 C/S 架构与 Web 发布，实现远程移动端访问生产数据。",
      tag: "数据中心",
      details: ["SQL 数据库", "C/S 架构", "Web 发布"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "SCADA 架构搭建",
        segments: [
          { time: "00-03", type: "bridge", title: "指挥中心", desc: "展示 NASA 指挥中心大屏，类比工厂 SCADA 系统。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解 C/S 架构；建立 WinCC 与 PLC 的 TCP/IP 连接。" },
          { time: "05-10", type: "pre-assessment", title: "带宽计算", desc: "‘1000 个变量，1 秒刷新一次，流量有多大？’" },
          { time: "10-35", type: "participatory", title: "系统集成", desc: "创建 WinCC 项目，直接从 TIA Portal 导入 PLC 变量标签，制作主监控画面。" },
          { time: "35-42", type: "post-assessment", title: "通讯诊断", desc: "拔掉网线，观察 SCADA 画面上的‘连接中断’指示与变量灰显状态。" },
          { time: "42-45", type: "summary", title: "数据链路", desc: "总结从传感器到屏幕的数据流动路径。" }
        ]
      },
      {
        hour: 2,
        topic: "SQL 数据库连接",
        segments: [
          { time: "00-03", type: "bridge", title: "大数据的家", desc: "‘生产数据存哪里？Excel 还是数据库？’ 引入 SQL Server。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "掌握 ODBC 接口；编写 VBScript 读写 SQL 数据库。" },
          { time: "05-10", type: "pre-assessment", title: "SQL 语法", desc: "写出一条简单的 INSERT INTO 语句。" },
          { time: "10-35", type: "participatory", title: "存入数据库", desc: "在 SQL Server 中建表；编写 WinCC 脚本，每当生产完成一个零件，自动向数据库插入一条记录（时间、ID、质量）。" },
          { time: "35-42", type: "post-assessment", title: "查表验证", desc: "在数据库管理器中查询表，验证数据是否准确写入。" },
          { time: "42-45", type: "summary", title: "数字化基石", desc: "强调结构化数据对工业 4.0 的意义。" }
        ]
      },
      {
        hour: 3,
        topic: "报表系统开发",
        segments: [
          { time: "00-03", type: "bridge", title: "老板要看表", desc: "‘厂长想看上个月的产量报表，怎么给？’" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "能设计带有时间筛选功能的查询界面；实现数据导出。" },
          { time: "05-10", type: "pre-assessment", title: "查询逻辑", desc: "‘如何筛选 2023-10-01 到 2023-10-02 的数据？’" },
          { time: "10-35", type: "participatory", title: "报表制作", desc: "使用 Grid 控件显示查询结果；编写 SELECT SQL 语句响应‘查询’按钮；实现一键导出 CSV。" },
          { time: "35-42", type: "post-assessment", title: "Bug Hunter", desc: "测试跨月查询、空数据查询等边界情况，修复脚本 Bug。" },
          { time: "42-45", type: "summary", title: "商业智能", desc: "简述 BI (Business Intelligence) 概念。" }
        ]
      },
      {
        hour: 4,
        topic: "Web 发布 (B/S 架构)",
        segments: [
          { time: "00-03", type: "bridge", title: "手机监控", desc: "‘出差在外面，能不能用手机看工厂状态？’ 引入 Web 发布。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "配置 IIS 服务；实现 WebNavigator 发布。" },
          { time: "05-10", type: "pre-assessment", title: "B/S vs C/S", desc: "对比浏览器架构与客户端架构的优缺点。" },
          { time: "10-35", type: "participatory", title: "云端漫游", desc: "安装配置 Web 选件，发布画面；让学生用手机连接局域网 WiFi，通过浏览器访问自己的 SCADA 系统。" },
          { time: "35-42", type: "post-assessment", title: "攻防演练", desc: "尝试在未授权情况下访问网页，验证防火墙与用户认证机制。" },
          { time: "42-45", type: "summary", title: "万物互联", desc: "展望 HTML5 技术在工业监控中的未来。" }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "虚拟调试与数字孪生",
    hours: 4,
    icon: <Box className="w-6 h-6" />,
    original: { desc: "直接在物理设备上编写调试，风险大。", tag: "现场调试" },
    enriched: {
      desc: "MCD 数字化双胞胎。在物理设备制造前，使用仿真软件 (如 NX MCD/PLCSIM) 构建虚拟样机，进行逻辑验证与虚拟调试。",
      tag: "虚拟仿真",
      details: ["MCD 机电概念设计", "虚拟信号交互", "硬件在环 (HIL)"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "数字孪生概念",
        segments: [
          { time: "00-03", type: "bridge", title: "钢铁侠", desc: "播放钢铁侠全息投影设计装甲的片段，类比数字孪生。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解 SIL (Software-in-Loop) 概念；熟悉 NX MCD 界面。" },
          { time: "05-10", type: "pre-assessment", title: "仿真层级", desc: "区分‘几何仿真’（动画）与‘物理仿真’（带重力碰撞）的区别。" },
          { time: "10-35", type: "participatory", title: "赋予物理属性", desc: "导入静态 CAD 模型，为连杆、滑块添加‘刚体’和‘碰撞体’属性，设置重力方向。" },
          { time: "35-42", type: "post-assessment", title: "自由落体", desc: "点击播放，观察零件是否按牛顿定律掉落或碰撞。" },
          { time: "42-45", type: "summary", title: "虚拟样机", desc: "总结：‘把错误消灭在图纸阶段’。" }
        ]
      },
      {
        hour: 2,
        topic: "机电对象定义",
        segments: [
          { time: "00-03", type: "bridge", title: "提线木偶", desc: "‘怎么让死模型动起来？’ 引入运动副与驱动器。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "定义铰链副、滑动副；配置虚拟传感器与执行器。" },
          { time: "05-10", type: "pre-assessment", title: "自由度", desc: "‘一个滑块有几个自由度？’" },
          { time: "10-35", type: "participatory", title: "机电建模", desc: "添加滑动副限制气缸运动轨迹；布置虚拟光电开关检测位置；添加速度控制器驱动电机。" },
          { time: "35-42", type: "post-assessment", title: "手动测试", desc: "手动强制信号，验证模型动作逻辑是否符合机械设计。" },
          { time: "42-45", type: "summary", title: "模型保真度", desc: "讨论摩擦力、阻尼对仿真结果的影响。" }
        ]
      },
      {
        hour: 3,
        topic: "信号映射 (Mapping)",
        segments: [
          { time: "00-03", type: "bridge", title: "神经连接", desc: "‘大脑 (PLC) 怎么控制身体 (MCD)？’ 介绍信号映射。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "使用 PLCSIM Advanced 搭建虚拟 PLC；完成 IO 信号耦合。" },
          { time: "05-10", type: "pre-assessment", title: "变量匹配", desc: "‘PLC 的 Q 点应该连模型的输入还是输出？’" },
          { time: "10-35", type: "participatory", title: "虚实结合", desc: "配置外部信号表，将 PLC 的 Tag 表与 MCD 的信号名一一映射，建立通讯链路。" },
          { time: "35-42", type: "post-assessment", title: "联通性测试", desc: "在 PLC 变量表中强制 Q0.0，观察 MCD 模型气缸是否伸出。" },
          { time: "42-45", type: "summary", title: "接口标准化", desc: "强调标准化 IO 表的重要性。" }
        ]
      },
      {
        hour: 4,
        topic: "虚拟联调实战",
        segments: [
          { time: "00-03", type: "bridge", title: "黑盒测试", desc: "‘不烧坏一个零件，测出所有 Bug。’" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "在虚拟环境中运行 PLC 自动程序；验证防碰撞逻辑。" },
          { time: "05-10", type: "pre-assessment", title: "场景设计", desc: "设计一个‘机械手抓取工件’的测试流程。" },
          { time: "10-35", type: "participatory", title: "全流程仿真", desc: "编写 PLC 自动逻辑，启动仿真，观察 3D 模型运行。故意修改逻辑导致碰撞，观察物理引擎的碰撞反馈。" },
          { time: "35-42", type: "post-assessment", title: "调试报告", desc: "录制虚拟调试视频，指出程序中潜在的逻辑漏洞。" },
          { time: "42-45", type: "summary", title: "未来已来", desc: "展望数字孪生在全生命周期管理中的应用。" }
        ]
      }
    ]
  },
  {
    id: 12,
    title: "IIoT 网关与云平台对接",
    hours: 4,
    icon: <Server className="w-6 h-6" />,
    original: { desc: "简单的 Modbus 串口通讯测试。", tag: "本地通讯" },
    enriched: {
      desc: "端到云的数据链路。开发边缘计算网关 (Python/Node-RED)，清洗 PLC 数据并通过 MQTT 协议上报至云平台 (阿里云/AWS) 进行可视化。",
      tag: "云端互联",
      details: ["MQTT 协议", "JSON 数据格式", "边缘计算网关"]
    },
    detailedSyllabus: [
      {
        hour: 1,
        topic: "IIoT 协议栈",
        segments: [
          { time: "00-03", type: "bridge", title: "快递系统", desc: "用快递物流类比 MQTT：Broker 是集散中心，Topic 是地址，Payload 是包裹。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "理解 MQTT 发布/订阅模式；掌握 Topic 设计规则。" },
          { time: "05-10", type: "pre-assessment", title: "QoS 等级", desc: "‘QoS 0, 1, 2 哪个最可靠？哪个最快？’" },
          { time: "10-35", type: "participatory", title: "本地通讯", desc: "搭建 Mosquitto Broker，使用 MQTT.fx 客户端模拟两个设备互发消息，体验‘解耦’通讯。" },
          { time: "35-42", type: "post-assessment", title: "通配符", desc: "测试通配符 # 和 + 的订阅效果。" },
          { time: "42-45", type: "summary", title: "轻量级", desc: "总结 MQTT 相比 HTTP 在物联网场景的优势。" }
        ]
      },
      {
        hour: 2,
        topic: "边缘网关开发 (Node-RED)",
        segments: [
          { time: "00-03", type: "bridge", title: "翻译官", desc: "‘PLC 说 S7 协议，云端说 JSON，谁来翻译？’ 引入 Node-RED 网关。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "使用 Node-RED 采集 S7 数据；进行 JSON 格式化清洗。" },
          { time: "05-10", type: "pre-assessment", title: "数据结构", desc: "手写一段简单的 JSON 键值对。" },
          { time: "10-35", type: "participatory", title: "流式编程", desc: "拖拽节点：Input(S7) -> Function(JS清洗) -> Debug。实现从 PLC 读取温度，转换为 {temp: 25.5} 格式。" },
          { time: "35-42", type: "post-assessment", title: "数据校验", desc: "检查 JSON 格式是否合法，能否被解析器识别。" },
          { time: "42-45", type: "summary", title: "低代码", desc: "体会低代码开发工具在边缘侧的效率。" }
        ]
      },
      {
        hour: 3,
        topic: "云端接入",
        segments: [
          { time: "00-03", type: "bridge", title: "云端身份证", desc: "‘设备上云需要身份证。’ 介绍三元组 (ProductKey, DeviceName, Secret)。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "在阿里云 IoT 平台创建产品；配置网关上云连接。" },
          { time: "05-10", type: "pre-assessment", title: "鉴权", desc: "‘如果 Secret 泄露了会怎样？’" },
          { time: "10-35", type: "participatory", title: "点亮云端", desc: "配置 Node-RED 的 MQTT Out 节点，填入云端参数，连接阿里云。看到云端设备状态变为‘在线’。" },
          { time: "35-42", type: "post-assessment", title: "双向通信", desc: "尝试从云端下发一条指令，网关接收并打印。" },
          { time: "42-45", type: "summary", title: "物模型", desc: "简述物模型 (TSL) 的定义。" }
        ]
      },
      {
        hour: 4,
        topic: "数据大屏可视化",
        segments: [
          { time: "00-03", type: "bridge", title: "双十一大屏", desc: "展示炫酷的数据可视化大屏，激发成就感。" },
          { time: "03-05", type: "objective", title: "目标设定", desc: "使用 IoT Studio 或 DataV 搭建实时监控仪表盘。" },
          { time: "05-10", type: "pre-assessment", title: "图表选型", desc: "‘显示过去 1 小时的温度变化，用饼图还是折线图？’" },
          { time: "10-35", type: "participatory", title: "我是指挥官", desc: "拖拽仪表盘、曲线图组件，绑定设备遥测数据。搭建一个‘全球工厂监控中心’大屏。" },
          { time: "35-42", type: "post-assessment", title: "延迟观测", desc: "改变 PLC 数据，观察大屏刷新的滞后时间。" },
          { time: "42-45", type: "summary", title: "课程结业", desc: "全班展示大屏作品，总结从底层传感器到顶层云端的全栈技术链路。颁发‘全栈工程师’虚拟勋章。" }
        ]
      }
    ]
  }
];

// --- 详情模态框组件 (含 BOPPPS 时间轴) ---
const DetailModal = ({ module, onClose }) => {
  const [activeHour, setActiveHour] = useState(1); // 默认展开第1学时

  if (!module) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* 模态框主体 */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative animate-modal-in">

        {/* 顶部 Header */}
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-start sticky top-0 z-10">
          <div className="flex gap-5">
             <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-blue-600">
                {module.icon}
             </div>
             <div>
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">Week {module.id}</span>
                   <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-full">{module.hours} 学时</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{module.title}</h3>
             </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* 滚动内容区 */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50">
          <div className="p-8">

            {/* 教学目标 */}
            <div className="mb-8 bg-white p-6 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>
               <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 relative z-10">
                  <Target size={18} className="text-blue-500" /> 核心教学目标
               </h4>
               <p className="text-slate-700 leading-relaxed font-medium relative z-10">
                  {module.enriched.desc}
               </p>
               <div className="mt-4 flex gap-2 relative z-10">
                  {module.enriched.details.map((tag, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 font-semibold">
                      #{tag}
                    </span>
                  ))}
               </div>
            </div>

            {/* 学时导航 Tab */}
            <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
              {[1, 2, 3, 4].map(hour => {
                const hourData = module.detailedSyllabus?.find(h => h.hour === hour);
                const isActive = activeHour === hour;
                return (
                  <button
                    key={hour}
                    onClick={() => setActiveHour(hour)}
                    className={`flex-1 min-w-[140px] p-4 rounded-xl border text-left transition-all duration-200 group relative overflow-hidden ${
                      isActive 
                        ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20' 
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Hour 0{hour}</div>
                    <div className={`font-bold truncate transition-colors ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
                      {hourData?.topic || "Topic TBD"}
                    </div>
                    {isActive && <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-full animate-draw-line"></div>}
                  </button>
                )
              })}
            </div>

            {/* BOPPPS 时间轴 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <Clock size={18} className="text-slate-400" />
                    第 {activeHour} 学时 - BOPPPS 教学设计
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                        45 Minutes
                    </span>
                    <span className="flex w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-green-600">Active Learning</span>
                  </div>
               </div>

               <div className="p-6 relative">
                  {/* 垂直连接线 */}
                  <div className="absolute left-[3.25rem] top-8 bottom-8 w-px bg-slate-100"></div>

                  {module.detailedSyllabus?.find(h => h.hour === activeHour)?.segments.map((segment, idx) => (
                    <div key={idx} className="relative flex gap-6 mb-8 last:mb-0 group">

                       {/* 左侧：时间与图标 */}
                       <div className="flex flex-col items-center flex-shrink-0 w-14 relative z-10">
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 mb-2">
                            {segment.time}
                          </span>
                          <SegmentIcon type={segment.type} />
                       </div>

                       {/* 右侧：卡片内容 */}
                       <div className="flex-grow bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:bg-white group-hover:border-blue-200 group-hover:shadow-md transition-all duration-300 relative">
                          <div className={`absolute left-0 top-4 w-1.5 h-1.5 -ml-[0.4rem] rotate-45 border-l border-b bg-slate-50 group-hover:bg-white group-hover:border-blue-200 border-slate-100 transition-colors`}></div>

                          <div className="flex justify-between items-start mb-2">
                             <div className="flex flex-col gap-1">
                                <BopLabel type={segment.type} />
                                <h5 className="font-bold text-slate-800 mt-1 text-base">{segment.title}</h5>
                             </div>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed pl-1">
                            {segment.desc}
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </div>

        {/* 底部 Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3 z-20">
           <button
             onClick={onClose}
             className="px-6 py-2.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors"
           >
             关闭
           </button>
           <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
             <PlayCircle size={16} /> 开始教学演示
           </button>
        </div>

      </div>
    </div>
  );
};

// --- 动画组件 (主页面用) ---
const AnimationRenderer = ({ id }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
      <Zap className="animate-pulse" />
    </div>
  );
};

// --- 主页面 App 组件 ---
const App = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-100 pb-20">
      <style>{customStyles}</style>

      {/* 详情模态框 */}
      {selectedModule && (
        <DetailModal module={selectedModule} onClose={() => setSelectedModule(null)} />
      )}

      {/* 顶部导航 */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/20">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">工业自动化系统课程设计 (Pro)</h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                <span>代码: 3912110140</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-blue-600 font-bold">48 学时 (12 模块)</span>
              </div>
            </div>
          </div>

          {/* 强制对比模式标签 */}
          <div className="flex items-center gap-2 opacity-80">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mode:</span>
            <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md text-xs font-bold border border-indigo-100 flex items-center gap-1">
              <Target size={12} /> 对比增强视图
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* 头部卡片 */}
        <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">面向工业 4.0 的全栈工程能力训练</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              本课程已全面升级为 <span className="font-bold text-blue-600">BOPPPS 教学模式</span>。48 个学时均按照 <span className="italic">引入-目标-摸底-参与-测验-总结</span> 六步闭环设计，确保以学生为中心的有效教学。
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Clock size={16} className="text-blue-500"/> 12 周 / 48 学时
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Server size={16} className="text-purple-500"/> IT/OT 深度融合
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 min-w-[180px]">
             <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-3xl font-bold text-blue-600">BOPPPS</div>
                <div className="text-xs text-blue-500 font-medium uppercase tracking-wider">闭环教学模型</div>
             </div>
          </div>
        </div>

        {/* 课程模块列表 */}
        <div className="space-y-6">
          {courseModules.map((module, index) => (
            <div key={module.id} className="relative">
              {/* 连接线 */}
              {index !== courseModules.length - 1 && (
                <div className="absolute left-[2.25rem] top-20 bottom-[-1.5rem] w-px bg-slate-200 hidden md:block z-0"></div>
              )}

              <div className="flex flex-col md:flex-row gap-6 relative z-10">

                {/* 左侧图标 */}
                <div className="flex-shrink-0">
                   <div
                      className="w-18 h-18 md:w-20 md:h-20 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center relative overflow-hidden group hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => setSelectedModule(module)}
                   >
                      <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                        {module.icon}
                      </div>
                      <div className="absolute bottom-1 text-[10px] font-bold text-slate-300 group-hover:text-blue-400">Week {module.id}</div>
                   </div>
                </div>

                {/* 右侧内容卡片 */}
                <div className="flex-grow bg-white rounded-xl border border-slate-200 shadow-sm p-1 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">

                  {/* 卡片头部 */}
                  <div className="px-5 py-3 border-b border-slate-50 flex justify-between items-center bg-white rounded-t-xl">
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors">{module.title}</h3>
                    <button
                      onClick={() => setSelectedModule(module)}
                      className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ListTodo size={14} /> 查看 BOPPPS 教学设计
                    </button>
                  </div>

                  {/* 对比内容 */}
                  <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* 旧 */}
                    <div className="space-y-2 md:border-r md:border-slate-100 md:pr-6 opacity-60 grayscale transition-all group-hover:grayscale-0 group-hover:opacity-100">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Traditional</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">{module.original.tag}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{module.original.desc}</p>
                    </div>

                    {/* 新 */}
                    <div className="space-y-2 relative">
                      <div className="hidden md:block absolute -left-[1.6rem] top-1/2 -translate-y-1/2 bg-white border border-slate-200 p-1 rounded-full text-slate-300 z-10 shadow-sm">
                        <ArrowRight size={12} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider flex items-center gap-1">
                          <Zap size={10} fill="currentColor" /> Modern Industry
                        </span>
                        <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100 font-medium">{module.enriched.tag}</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">{module.enriched.desc}</p>
                      <div className="pt-1 flex flex-wrap gap-2">
                        {module.enriched.details.map((item, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 text-[10px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded border border-indigo-100 font-medium">
                            <CheckCircle2 size={10} /> {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-slate-200 pt-8">
            <p className="text-slate-400 text-sm">© 2025 Intelligent Manufacturing Course Design System</p>
        </div>

      </main>
    </div>
  );
};

export default App;
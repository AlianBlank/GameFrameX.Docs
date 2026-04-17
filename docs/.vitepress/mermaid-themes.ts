export const mermaidThemes = {
    // 1. 赛博朋克 - 青色+紫色霓虹
    cyberpunk: {
        theme: 'base',
        themeVariables: {
            primaryColor: '#00fff9',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#ff00ff',
            lineColor: '#00fff9',
            secondaryColor: '#1a0a2e',
            tertiaryColor: '#16213e',
            background: '#0a0a0f',
            mainBkg: '#1a0a2e',
            secondBkg: '#16213e',
            fontFamily: 'JetBrains Mono, Consolas, monospace',
            fontSize: '14px',
            textColor: '#ffffff',
            nodeTextColor: '#00fff9',
            edgeLabelBackground: '#1a0a2e',
        }
    },

    // 2. 科幻深空 - 蓝色+银白
    scifi: {
        theme: 'base',
        themeVariables: {
            primaryColor: '#4a90d9',
            primaryTextColor: '#e0e6ed',
            primaryBorderColor: '#4a90d9',
            lineColor: '#7eb8da',
            secondaryColor: '#1c2a3a',
            tertiaryColor: '#2d3e50',
            background: '#0d1117',
            mainBkg: '#1c2a3a',
            secondBkg: '#2d3e50',
            fontFamily: 'Orbitron, Rajdhani, sans-serif',
            fontSize: '14px',
            textColor: '#e0e6ed',
            nodeTextColor: '#7eb8da',
            edgeLabelBackground: '#1c2a3a',
            clusterBkg: '#1c2a3a',
            clusterBorder: '#4a90d9',
        }
    },

    // 3. 炫彩霓虹 - 彩虹色渐变风格
    neon: {
        theme: 'base',
        themeVariables: {
            primaryColor: '#ff006e',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#8338ec',
            lineColor: '#ffbe0b',
            secondaryColor: '#3a0ca3',
            tertiaryColor: '#4361ee',
            background: '#000000',
            mainBkg: '#1a1a2e',
            secondBkg: '#3a0ca3',
            fontFamily: 'Arial Black, Impact, sans-serif',
            fontSize: '14px',
            textColor: '#ffffff',
            nodeTextColor: '#ff006e',
            edgeLabelBackground: '#3a0ca3',
            clusterBkg: '#1a1a2e',
            clusterBorder: '#ffbe0b',
        }
    },

    // 4. 文档风格 - 简洁专业
    documentation: {
        theme: 'base',
        themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#1f2937',
            primaryBorderColor: '#3b82f6',
            lineColor: '#6b7280',
            secondaryColor: '#f3f4f6',
            tertiaryColor: '#e5e7eb',
            background: '#ffffff',
            mainBkg: '#f9fafb',
            secondBkg: '#f3f4f6',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
            textColor: '#1f2937',
            nodeTextColor: '#1f2937',
            edgeLabelBackground: '#f3f4f6',
            clusterBkg: '#f3f4f6',
            clusterBorder: '#d1d5db',
        }
    },

    // 5. 复古终端 - 经典绿色 CRT
    retroTerminal: {
        theme: 'base',
        themeVariables: {
            primaryColor: '#00ff00',
            primaryTextColor: '#00ff00',
            primaryBorderColor: '#00ff00',
            lineColor: '#00cc00',
            secondaryColor: '#003300',
            tertiaryColor: '#001a00',
            background: '#0a0a0a',
            mainBkg: '#001100',
            secondBkg: '#003300',
            fontFamily: 'VT323, Courier New, monospace',
            fontSize: '16px',
            textColor: '#00ff00',
            nodeTextColor: '#00ff00',
            edgeLabelBackground: '#001100',
            clusterBkg: '#001100',
            clusterBorder: '#00ff00',
        }
    },

    // 6. 暗夜极客 - 红色警告风格
    darkHacker: {
        theme: 'base',
        themeVariables: {
            primaryColor: '#ff3333',
            primaryTextColor: '#ffcccc',
            primaryBorderColor: '#ff3333',
            lineColor: '#ff6666',
            secondaryColor: '#1a0a0a',
            tertiaryColor: '#2d1515',
            background: '#0a0505',
            mainBkg: '#1a0a0a',
            secondBkg: '#2d1515',
            fontFamily: 'Fira Code, Consolas, monospace',
            fontSize: '14px',
            textColor: '#ffcccc',
            nodeTextColor: '#ff6666',
            edgeLabelBackground: '#1a0a0a',
            clusterBkg: '#1a0a0a',
            clusterBorder: '#ff3333',
        }
    },

    // 7. 琥珀复古 - 暖色怀旧
    amber: {
        theme: 'base',
        themeVariables: {
            primaryColor: '#ffb000',
            primaryTextColor: '#fff8e7',
            primaryBorderColor: '#ff8c00',
            lineColor: '#cc8800',
            secondaryColor: '#2d1f0f',
            tertiaryColor: '#4a3520',
            background: '#1a1205',
            mainBkg: '#2d1f0f',
            secondBkg: '#4a3520',
            fontFamily: 'Courier Prime, Courier New, monospace',
            fontSize: '14px',
            textColor: '#fff8e7',
            nodeTextColor: '#ffb000',
            edgeLabelBackground: '#2d1f0f',
            clusterBkg: '#2d1f0f',
            clusterBorder: '#ffb000',
        }
    },

    // 8. 极光北欧 - 冰蓝+紫罗兰
    aurora: {
        theme: 'base',
        themeVariables: {
            primaryColor: '#64ffda',
            primaryTextColor: '#e0e6ed',
            primaryBorderColor: '#a78bfa',
            lineColor: '#64ffda',
            secondaryColor: '#1a1b2e',
            tertiaryColor: '#2d2b4a',
            background: '#0f0f1a',
            mainBkg: '#1a1b2e',
            secondBkg: '#2d2b4a',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '14px',
            textColor: '#e0e6ed',
            nodeTextColor: '#64ffda',
            edgeLabelBackground: '#1a1b2e',
            clusterBkg: '#1a1b2e',
            clusterBorder: '#a78bfa',
        }
    },
}

export type ThemeName = keyof typeof mermaidThemes

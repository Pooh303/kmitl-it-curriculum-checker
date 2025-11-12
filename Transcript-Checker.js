// This version without obfuscation is for development and debugging purposes.

(function () {
    // === ส่วนของการประกาศตัวแปรหลักที่ใช้ทั่วทั้งสคริปต์ ===
    let popupWindow = null;
    let analysisData = {};

    // === ส่วนของการตั้งค่าข้อมูล (Configuration Data) ===
    const COURSE_NAMES = { '90641001': 'โรงเรียนสร้างเสน่ห์', '90641002': 'ความฉลาดทางดิจิทัล', '90641003': 'กีฬาและนันทนาการ', '90644007': 'ภาษาอังกฤษพื้นฐาน 1', '90644008': 'ภาษาอังกฤษพื้นฐาน 2', '90642033': 'กฎหมายสำหรับคนรุ่นใหม่', '90643021': 'ผู้ประกอบการสมัยใหม่', '90644042': 'การสื่อสารและการนำเสนออย่างมืออาชีพ', '06066000': 'คณิตศาสตร์ไม่ต่อเนื่อง', '06066001': 'ความน่าจะเป็นและสถิติ', '06016401': 'คณิตศาสตร์สำหรับเทคโนโลยีสารสนเทศ', '06016402': 'พื้นฐานทางด้านเทคโนโลยีสารสนเทศ', '06066100': 'การบริหารโครงการเทคโนโลยีสารสนเทศ', '06066101': 'พื้นฐานทางธุรกิจสำหรับเทคโนโลยีสารสนเทศ', '06066102': 'ระบบสารสนเทศเพื่อการจัดการ', '06016403': 'เทคโนโลยีสื่อประสม', '06016404': 'เทคโนโลยีกลุ่มเมฆ', '06016405': 'พื้นฐานความมั่นคงปลอดภัยไซเบอร์', '06016406': 'โครงงาน 1', '06016407': 'โครงงาน 2', '06066300': 'แนวคิดระบบฐานข้อมูล', '06066301': 'โครงสร้างข้อมูลและอัลกอริทึม', '06066302': 'การเขียนโปรแกรมเว็บพื้นฐาน', '06066304': 'การวิเคราะห์และออกแบบระบบสารสนเทศ', '06016408': 'การสร้างโปรแกรมเชิงวัตถุ', '06016409': 'การประมวลทางกายภาพ', '06016410': 'วิศวกรรมซอฟต์แวร์', '06066303': 'การแก้ปัญหาและการโปรแกรมคอมพิวเตอร์', '06016411': 'ระบบคอมพิวเตอร์เบื้องต้น', '06016412': 'โครงสร้างระบบคอมพิวเตอร์และระบบปฏิบัติการ', '06016413': 'ระบบเครือข่ายเบื้องต้น', '06016414': 'ระบบฐานข้อมูลแบบโนเอสคิวแอล', '06016415': 'การเขียนโปรแกรมเชิงฟังก์ชัน', '06016416': 'วิศวกรรมความต้องการ', '06016417': 'เครื่องมือและสภาพแวดล้อมสำหรับการพัฒนาซอฟต์แวร์', '06016418': 'การพัฒนาเว็บฝั่งเซิร์ฟเวอร์', '06016419': 'โครงสร้างพื้นฐานเครือข่ายการสื่อสาร', '06016420': 'ระบบโครงสร้างพื้นฐานและการบริการ', '06016421': 'ความมั่นคงปลอดภัยโครงสร้างพื้นฐานทางเทคโนโลยีสารสนเทศ', '06016422': 'อินเทอร์เน็ตของสรรพสิ่ง', '06016423': 'การออโตเมชั่นและโครงสร้างพื้นฐานที่สามารถโปรแกรมได้', '06016424': 'การออกแบบส่วนต่อประสานกับมนุษย์', '06016425': 'พื้นฐานการออกแบบทัศนศิลป์สำหรับสื่อปฏิสัมพันธ์', '06016426': 'คอมพิวเตอร์กราฟิกส์และแอนิเมชัน', '06016427': 'การออกแบบและพัฒนาเกมเบื้องต้น', '06016481': 'สหกิจศึกษา', '06016482': 'สหกิจศึกษาต่างประเทศ' };
    const CURRICULUM_REQUIREMENTS = {
        generalEducation: { total: 30, groups: { foundation: { name: 'กลุ่มพื้นฐาน', required: 6, courses: ['90641001', '90641002', '90641003'] }, language: { name: 'กลุ่มภาษาและการสื่อสาร', required: 9, courses: ['90644007', '90644008'], electivePrefix: '90644' }, faculty: { name: 'กลุ่มตามเกณฑ์คณะ', required: 9, courses: ['90642033', '90643021', '90644042'] }, generalElective: { name: 'กลุ่มเลือกศึกษาทั่วไป', required: 6, prefix: '9064' } } },
        majorCourses: { total: 93, groups: { core: { name: 'กลุ่มวิชาแกน', required: 12, courses: ['06066000', '06066001', '06016401', '06016402'] }, organization: { name: 'กลุ่มองค์การและระบบสารสนเทศ', required: 9, courses: ['06066100', '06066101', '06066102'] }, technology: { name: 'กลุ่มเทคโนโลยีเพื่องานประยุกต์', required: 27, courses: ['06016403', '06016404', '06016405', '06016406', '06016407', '06066300', '06066301', '06066302', '06066304'] }, software: { name: 'กลุ่มเทคโนโลยีและวิธีการทางซอฟต์แวร์', required: 12, courses: ['06016408', '06016409', '06016410', '06066303'] }, infrastructure: { name: 'กลุ่มโครงสร้างพื้นฐานของระบบ', required: 9, courses: ['06016411', '06016412', '06016413'] }, specialization: { name: 'กลุ่มวิชาบังคับเฉพาะสาขา', required: 15, selectOne: true, tracks: { softwareDev: { name: 'การพัฒนาซอฟต์แวร์', courses: ['06016414', '06016415', '06016416', '06016417', '06016418'] }, infrastructure: { name: 'โครงสร้างพื้นฐาน IT', courses: ['06016419', '06016420', '06016421', '06016422', '06016423'] }, multimedia: { name: 'สื่อประสม เว็บ และเกม', courses: ['06016424', '06016425', '06016426', '06016427', '06016418'] } } }, itElective: { name: 'กลุ่มวิชาเลือกทางเทคโนโลยีสารสนเทศ', required: 9, prefix: '06016', rangeStart: '06016428', rangeEnd: '06016480' }, coop: { name: 'กลุ่มวิชาการศึกษาทางเลือก (สหกิจศึกษา)', optional: true, replaces: 'itElective', credits: 6, courses: ['06016481', '06016482'] } } },
        freeElective: { name: 'ค. หมวดวิชาเลือกเสรี', required: 6 }
    };

    // --- Helper Functions ---
    function isPassingGrade(grade) { const failingGrades = ['F', 'U', 'W']; return grade && !failingGrades.includes(String(grade).toUpperCase()); }
    function isPendingGrade(grade) { return String(grade).trim() === ''; }

    // === FUNCTION: extractTranscriptDataFromDOM ===
    function extractTranscriptDataFromDOM() {
        const studentInfo = {};
        const semesters = [];
        const transferredCredits = [];

        function parseStudentInfo(rows) {
            rows.forEach(row => {
                row.querySelectorAll('td').forEach(cell => {
                    const strong = cell.querySelector('strong');
                    if (!strong) return;

                    const label = strong.textContent.trim();
                    const value = cell.textContent.replace(label, '').replace(/\s+/g, ' ').trim();

                    if (label.includes('Name')) studentInfo.name = value.replace(/^Mrs?\.\s+/, '').trim();
                    else if (label.includes('Student ID')) studentInfo.id = value;
                    else if (label.includes('Date of Admission')) studentInfo.admissionDate = value;
                    else if (label.includes('Major')) studentInfo.major = value;
                });
            });
        }

        const rows = document.querySelectorAll('body > center > table > tbody > tr > td > table > tbody > tr');
        parseStudentInfo(Array.from(rows).slice(0, 15));

        const leftColumnItems = [];
        const rightColumnItems = [];
        let lastLeftCourse = null;
        let lastRightCourse = null;

        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll('td'));
            const cellTexts = cells.map(cell => cell.textContent.trim());
            cells.forEach(cell => {
                const cumGpaMatch = cell.textContent.match(/Cumulative GPA:\s*([0-9.]+)/);
                if (cumGpaMatch) {
                    studentInfo.cumulativeGpa = cumGpaMatch[1];
                }
            });
            const isCourseCode = (code) => /^\d{8}$/.test(code);

            const leftHeaderCell = cells[0];
            if (leftHeaderCell && leftHeaderCell.getAttribute('colspan') === '3') {
                const headerTextEl = leftHeaderCell.querySelector('strong > u');
                if (headerTextEl && headerTextEl.textContent.trim()) { leftColumnItems.push({ type: 'semesterHeader', content: headerTextEl.textContent.trim() }); }
                const gpaGpsText = leftHeaderCell.textContent.trim();
                if (gpaGpsText.includes('GPS :')) {
                    const gpsMatch = gpaGpsText.match(/GPS : ([\d.-]+)/);
                    const gpaMatch = gpaGpsText.match(/GPA : ([\d.-]+)/);
                    leftColumnItems.push({ type: 'gpa', content: { gps: gpsMatch ? gpsMatch[1] : null, gpa: gpaMatch ? gpaMatch[1] : null } });
                }
            }
            if (cells.length > 6 && isCourseCode(cellTexts[0])) {
                const course = { code: cellTexts[0], title: cellTexts[2], credit: cellTexts[4], grade: cellTexts[6].replace(/\s/g, '') };
                leftColumnItems.push({ type: 'course', content: course });
                lastLeftCourse = course;
            } else if (cells.length > 2 && cellTexts[0] === '' && lastLeftCourse && !lastLeftCourse.title.includes(cellTexts[2])) {
                lastLeftCourse.title += ' ' + cellTexts[2];
            }

            const rightHeaderCell = cells[7];
            if (rightHeaderCell && rightHeaderCell.getAttribute('colspan') === '3') {
                const headerTextEl = rightHeaderCell.querySelector('strong > u');
                if (headerTextEl && headerTextEl.textContent.trim()) { rightColumnItems.push({ type: 'semesterHeader', content: headerTextEl.textContent.trim() }); }
            }
            const rightGpaCell = cells[8];
            if (rightGpaCell && rightGpaCell.getAttribute('colspan') === '3') {
                const gpaGpsText = rightGpaCell.textContent.trim();
                if (gpaGpsText.includes('GPS :')) {
                    const gpsMatch = gpaGpsText.match(/GPS : ([\d.-]+)/);
                    const gpaMatch = gpaGpsText.match(/GPA : ([\d.-]+)/);
                    rightColumnItems.push({ type: 'gpa', content: { gps: gpsMatch ? gpsMatch[1] : null, gpa: gpaMatch ? gpaMatch[1] : null } });
                }
            }
            if (cells.length > 14 && isCourseCode(cellTexts[8])) {
                const course = { code: cellTexts[8], title: cellTexts[10], credit: cellTexts[12], grade: cellTexts[14].replace(/\s/g, '') };
                rightColumnItems.push({ type: 'course', content: course });
                lastRightCourse = course;
            } else if (cells.length > 8 && cells[0] && cells[0].getAttribute('colspan') === '3' && isCourseCode(cellTexts[6])) {
                const course = { code: cellTexts[6], title: cellTexts[8], credit: cellTexts[10], grade: cellTexts[12].replace(/\s/g, '') || 'B+' };
                rightColumnItems.push({ type: 'course', content: course });
                lastRightCourse = course;
            } else if (cells.length > 10 && cellTexts[8] === '' && lastRightCourse && !lastRightCourse.title.includes(cellTexts[10])) {
                lastRightCourse.title += ' ' + cellTexts[10];
            }
        });

        const allItems = [...leftColumnItems, ...rightColumnItems];
        let currentSemester = null;
        let isTransferSection = false;

        const admissionYear = studentInfo.admissionDate ? parseInt(studentInfo.admissionDate, 10) : null;

        for (const item of allItems) {
            if (item.type === 'semesterHeader') {
                if (item.content.includes('Transferred Credits')) {
                    isTransferSection = true;
                    currentSemester = null;
                } else {
                    isTransferSection = false;
                    let title = item.content;
                    if (admissionYear) {
                        const yearMatch = title.match(/(\d{4})-\d{4}/);
                        if (yearMatch) {
                            const semesterYear = parseInt(yearMatch[1], 10);
                            const academicYear = semesterYear - admissionYear + 1;
                            if (academicYear > 0) {
                                title = title.replace(', Year,', `, Year ${academicYear},`);
                            }
                        }
                    }
                    currentSemester = { title: title, courses: [], gps: null, gpa: null };
                    semesters.push(currentSemester);
                }
            } else if (item.type === 'course') {
                if (isTransferSection || !currentSemester) {
                    transferredCredits.push(item.content);
                } else {
                    currentSemester.courses.push(item.content);
                }
            } else if (item.type === 'gpa' && currentSemester) {
                currentSemester.gps = item.content.gps;
                currentSemester.gpa = item.content.gpa;
            }
        }
        return { studentInfo, transferredCredits, semesters };
    }
    function analyzeTranscriptData() {
        const rawData = extractTranscriptDataFromDOM();
        console.log("--- Raw Extracted JSON Data ---"); console.log(JSON.stringify(rawData, null, 2));
        let totalCredits = 0, transferredCredits = 0, subjectCount = 0, transferCount = 0;
        let allSubjects = []; let semesterData = {};
        rawData.transferredCredits.forEach(course => {
            const credit = parseInt(course.credit, 10) || 0;
            if (isPassingGrade(course.grade)) { transferredCredits += credit; }
            transferCount++; allSubjects.push({ code: course.code, name: course.title, credit, grade: course.grade, isTransfer: true });
        });
        rawData.semesters.forEach(semester => {
            const semesterName = semester.title;
            semesterData[semesterName] = { subjects: [], credits: 0, gps: semester.gps, gpa: semester.gpa };
            semester.courses.forEach(course => {
                const credit = parseInt(course.credit, 10) || 0;
                const subjectInfo = { code: course.code, name: course.title, credit, grade: course.grade, isTransfer: false };
                semesterData[semesterName].subjects.push(subjectInfo); allSubjects.push(subjectInfo);
                if (isPassingGrade(course.grade)) {
                    totalCredits += credit; semesterData[semesterName].credits += credit;
                }
                subjectCount++;
            });
        });
        const totalAllCredits = totalCredits + transferredCredits;
        const curriculumCheck = checkCurriculumRequirements(allSubjects);
        return { studentInfo: rawData.studentInfo, totalCredits, transferredCredits, totalAllCredits, subjectCount, transferCount, remaining: Math.max(0, 129 - totalAllCredits), canGraduate: totalAllCredits >= 129, progress: parseFloat(((totalAllCredits / 129) * 100).toFixed(1)), semesterData, allSubjects, curriculumCheck };
    }

    // === FUNCTION: checkCurriculumRequirements ===
    // You can change CURRICULUM_REQUIREMENTS and COURSE_NAMES to adapt to different curricula
    function checkCurriculumRequirements(allSubjects) {
        const result = { generalEducation: { groups: {} }, majorCourses: { groups: {} }, freeElective: {} };
        const usedCourses = new Set();
        let totalCreditsUsedInRequirements = 0;

        const getStatus = (earned, required, pending, missing) => {
            if (earned >= required) return 'passed';
            if ((missing?.length ?? 0) === 0 && (earned + pending.reduce((sum, c) => sum + (parseInt(c.credit, 10) || 0), 0)) >= required) return 'pending';
            return 'failed';
        };

        // --- A. General Education ---
        const genEdGroups = CURRICULUM_REQUIREMENTS.generalEducation.groups;
        // 1. Process required courses first
        ['foundation', 'language', 'faculty'].forEach(key => {
            const group = genEdGroups[key];
            const takenCourses = [], pendingCourses = [], missingCourses = [...group.courses];
            let earnedCredits = 0;
            group.courses.forEach(code => {
                const subject = allSubjects.find(s => s.code === code);
                if (subject) {
                    const missingIndex = missingCourses.indexOf(code);
                    if (missingIndex > -1) missingCourses.splice(missingIndex, 1);
                    if (isPassingGrade(subject.grade)) {
                        takenCourses.push(subject); earnedCredits += subject.credit; usedCourses.add(subject.code);
                    } else if (isPendingGrade(subject.grade)) { pendingCourses.push(subject); }
                }
            });
            result.generalEducation.groups[key] = { takenCourses, pendingCourses, earnedCredits, missingCourses: missingCourses.map(code => ({ code, name: allSubjects.find(s => s.code === code)?.name || COURSE_NAMES[code] })) };
        });

        // 2. Process GenEd electives
        // Language Elective (3 credits)
        const langElecGroup = result.generalEducation.groups.language;
        let langElecNeeded = 3;
        allSubjects.filter(s => s.code.startsWith(genEdGroups.language.electivePrefix) && !usedCourses.has(s.code)).forEach(s => {
            if (langElecNeeded > 0) {
                if (isPassingGrade(s.grade)) {
                    langElecGroup.takenCourses.push(s); langElecGroup.earnedCredits += s.credit; usedCourses.add(s.code); langElecNeeded -= s.credit;
                } else if (isPendingGrade(s.grade)) {
                    langElecGroup.pendingCourses.push(s); langElecNeeded -= s.credit;
                }
            }
        });

        // General Elective (6 credits)
        const genElecGroup = { name: genEdGroups.generalElective.name, required: 6, takenCourses: [], pendingCourses: [], earnedCredits: 0, missingCourses: [] };
        let genElecNeeded = 6;
        allSubjects.filter(s => s.code.startsWith(genEdGroups.generalElective.prefix) && !usedCourses.has(s.code)).forEach(s => {
            if (genElecNeeded > 0) {
                if (isPassingGrade(s.grade)) {
                    genElecGroup.takenCourses.push(s); genElecGroup.earnedCredits += s.credit; usedCourses.add(s.code); genElecNeeded -= s.credit;
                } else if (isPendingGrade(s.grade)) {
                    genElecGroup.pendingCourses.push(s); genElecNeeded -= s.credit;
                }
            }
        });
        result.generalEducation.groups.generalElective = genElecGroup;

        // 3. Finalize GenEd status
        Object.keys(genEdGroups).forEach(key => {
            const group = genEdGroups[key];
            const data = result.generalEducation.groups[key];
            totalCreditsUsedInRequirements += data.earnedCredits;
            data.status = getStatus(data.earnedCredits, group.required, data.pendingCourses, data.missingCourses);
            data.name = group.name; data.required = group.required; data.remaining = Math.max(0, group.required - data.earnedCredits);
        });

        // --- B. Major Courses ---
        const majorGroups = CURRICULUM_REQUIREMENTS.majorCourses.groups;
        // 1. Process simple required groups
        ['core', 'organization', 'technology', 'software', 'infrastructure'].forEach(key => {
            const group = majorGroups[key];
            const takenCourses = [], pendingCourses = [], missingCourses = [...group.courses];
            let earnedCredits = 0;
            group.courses.forEach(code => {
                const subject = allSubjects.find(s => s.code === code);
                if (subject) {
                    const missingIndex = missingCourses.indexOf(code);
                    if (missingIndex > -1) missingCourses.splice(missingIndex, 1);
                    if (isPassingGrade(subject.grade)) {
                        takenCourses.push(subject); earnedCredits += subject.credit; usedCourses.add(subject.code);
                    } else if (isPendingGrade(subject.grade)) { pendingCourses.push(subject); }
                }
            });
            const status = getStatus(earnedCredits, group.required, pendingCourses, missingCourses);
            totalCreditsUsedInRequirements += earnedCredits;
            result.majorCourses.groups[key] = { ...group, earnedCredits, takenCourses, pendingCourses, missingCourses: missingCourses.map(code => ({ code, name: allSubjects.find(s => s.code === code)?.name || COURSE_NAMES[code] })), status, remaining: Math.max(0, group.required - earnedCredits) };
        });

        // 2. Process Specialization Tracks
        const trackGroup = majorGroups.specialization;
        const trackResults = {};
        let bestTrackKey = null, maxCredits = -1;
        Object.keys(trackGroup.tracks).forEach(trackKey => {
            const track = trackGroup.tracks[trackKey];
            let earned = 0;
            track.courses.forEach(code => {
                const subject = allSubjects.find(s => s.code === code && isPassingGrade(s.grade));
                if (subject) earned += subject.credit;
            });
            trackResults[trackKey] = { earned };
            if (earned > maxCredits) { maxCredits = earned; bestTrackKey = trackKey; }
        });

        const primaryTrack = trackGroup.tracks[bestTrackKey];
        const takenCourses = [], pendingCourses = [], missingCourses = [...primaryTrack.courses];
        let earnedCredits = 0;
        primaryTrack.courses.forEach(code => {
            const subject = allSubjects.find(s => s.code === code);
            if (subject) {
                const missingIndex = missingCourses.indexOf(code);
                if (missingIndex > -1) missingCourses.splice(missingIndex, 1);
                if (isPassingGrade(subject.grade)) {
                    takenCourses.push(subject); earnedCredits += subject.credit; usedCourses.add(subject.code);
                } else if (isPendingGrade(subject.grade)) { pendingCourses.push(subject); }
            }
        });
        totalCreditsUsedInRequirements += earnedCredits;
        result.majorCourses.groups.specialization = { name: trackGroup.name, required: trackGroup.required, earnedCredits, takenCourses, pendingCourses, missingCourses: missingCourses.map(code => ({ code, name: allSubjects.find(s => s.code === code)?.name || COURSE_NAMES[code] })), status: getStatus(earnedCredits, trackGroup.required, pendingCourses, missingCourses), remaining: Math.max(0, trackGroup.required - earnedCredits), note: `(Track หลัก: ${primaryTrack.name})` };

        // 3. Process Co-op and IT Electives
        const coopGroup = majorGroups.coop;
        const hasCoop = allSubjects.some(s => coopGroup.courses.includes(s.code) && isPassingGrade(s.grade));
        if (hasCoop) {
            const coopSubject = allSubjects.find(s => coopGroup.courses.includes(s.code) && isPassingGrade(s.grade));
            usedCourses.add(coopSubject.code);
            totalCreditsUsedInRequirements += 6;
            result.majorCourses.groups.coop = { name: coopGroup.name, required: 6, earnedCredits: 6, status: 'passed', takenCourses: [coopSubject], pendingCourses: [], missingCourses: [] };
        }

        const itElecGroup = majorGroups.itElective;
        const requiredItElectiveCredits = hasCoop ? 3 : 9;
        const itElecTaken = [], itElecPending = [];
        let itElecEarned = 0;
        let itElecNeeded = requiredItElectiveCredits;

        allSubjects.filter(s => !usedCourses.has(s.code)).forEach(s => {
            const codeNum = parseInt(s.code);
            const isInRange = codeNum >= parseInt(itElecGroup.rangeStart) && codeNum <= parseInt(itElecGroup.rangeEnd);
            if (isInRange && itElecNeeded > 0) {
                if (isPassingGrade(s.grade)) {
                    itElecTaken.push(s); itElecEarned += s.credit; usedCourses.add(s.code); itElecNeeded -= s.credit;
                } else if (isPendingGrade(s.grade)) {
                    itElecPending.push(s); itElecNeeded -= s.credit;
                }
            }
        });
        totalCreditsUsedInRequirements += itElecEarned;
        result.majorCourses.groups.itElective = { name: itElecGroup.name, required: requiredItElectiveCredits, earnedCredits: itElecEarned, takenCourses: itElecTaken, pendingCourses: itElecPending, missingCourses: [], status: getStatus(itElecEarned, requiredItElectiveCredits, itElecPending, []), remaining: Math.max(0, requiredItElectiveCredits - itElecEarned), note: hasCoop ? '(ลดเหลือ 3 หน่วยกิตเพราะเรียนสหกิจ)' : '' };

        // --- C. Free Electives ---
        const totalPassedCredits = allSubjects.filter(s => isPassingGrade(s.grade)).reduce((sum, s) => sum + (parseInt(s.credit, 10) || 0), 0);
        const freeElectiveCredits = totalPassedCredits - totalCreditsUsedInRequirements;
        const freeReq = CURRICULUM_REQUIREMENTS.freeElective.required;
        const takenFreeElective = allSubjects.filter(
            s => isPassingGrade(s.grade) && !usedCourses.has(s.code)
        );
        result.freeElective = { name: CURRICULUM_REQUIREMENTS.freeElective.name, required: freeReq, earned: freeElectiveCredits, status: freeElectiveCredits >= freeReq ? 'passed' : 'failed', remaining: Math.max(0, freeReq - freeElectiveCredits),takenCourses: takenFreeElective, };

        return result;
    }

    // === HTML Generation Functions ===
    function createPopupHTML(data) {
        const semestersByYear = {};
        const gpaText = data.studentInfo.cumulativeGpa ? data.studentInfo.cumulativeGpa : '-';
        Object.keys(data.semesterData).forEach(semesterTitle => {
            const match = semesterTitle.match(/Semester, Year (\d+)/i);
            if (match) {
                const year = match[1];
                const term = semesterTitle.toLowerCase().includes('1st') ? '1' : (semesterTitle.toLowerCase().includes('2nd') ? '2' : 'Summer');
                if (!semestersByYear[year]) {
                    semestersByYear[year] = [];
                }
                semestersByYear[year].push({
                    ...data.semesterData[semesterTitle],
                    originalTitle: semesterTitle,
                    term: term
                });
            }
        });

        const semesterHTML = Object.keys(semestersByYear).sort((a, b) => a - b).map(year => {
            const semestersForThisYear = semestersByYear[year];
            const existingTerms = semestersForThisYear.map(s => s.term);
            if (!existingTerms.includes('1')) {
                semestersForThisYear.push({ term: '1', subjects: [], credits: 0, gps: null, isEmpty: true });
            }
            if (!existingTerms.includes('2')) {
                semestersForThisYear.push({ term: '2', subjects: [], credits: 0, gps: null, isEmpty: true });
            }
            const sortedSemesters = semestersForThisYear.sort((a, b) => a.term.localeCompare(b.term));
            const yearContentHTML = sortedSemesters.map(semData => {
                const displayTerm = `เทอม ${semData.term}`;
                if (semData.isEmpty) {
                    return `
                    <div class="semester-item empty">
                        <div class="semester-header">
                            <span>${displayTerm}</span>
                            <span class="semester-stats">ยังไม่มีข้อมูล</span>
                        </div>
                    </div>`;
                }
                const subjectsHTML = semData.subjects.map(s => `
                <tr>
                    <td>${s.code}</td>
                    <td>${s.name}</td>
                    <td class="center">${s.credit}</td>
                    <td class="center"><span class="grade grade-${(s.grade || '').replace(/[^A-Za-z]/g, '')}">${s.grade || '-'}</span></td>
                </tr>`).join('');

                return `
                <div class="semester-item">
                    <div class="semester-header" onclick="toggleContent(this)">
                        <span>${displayTerm}</span>
                        <span class="semester-stats">
                            Credits: <strong>${semData.credits}</strong>
                            ${semData.gps ? ` / GPS: <strong>${semData.gps}</strong>` : ''}
                        </span>
                    </div>
                    <div class="semester-content collapsed">
                        <table class="subject-table">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Title</th>
                                    <th class="center">Credit</th>
                                    <th class="center">Grade</th>
                                </tr>
                            </thead>
                            <tbody>${subjectsHTML}</tbody>
                        </table>
                    </div>
                </div>`;
            }).join('');

            return `
            <div class="year-group">
                <div class="year-header" onclick="toggleContent(this)">
                    <h2>ชั้นปีที่ ${year}</h2>
                    <span class="arrow">▼</span>
                </div>
                <div class="year-content collapsed">
                    ${yearContentHTML}
                </div>
            </div>`;
        }).join('');

        const curriculumHTML = createCurriculumCheckHTML(data.curriculumCheck);
        const statusMessage = data.canGraduate ? '🎉 ยินดีด้วย! คุณผ่านเกณฑ์หน่วยกิตสำหรับจบการศึกษาแล้ว' : `⚠️ ยังต้องเก็บเพิ่มอีก ${data.remaining} หน่วยกิต เพื่อจบการศึกษา`;

        return `<!DOCTYPE html>
        <html>
        <head>
            <title>Transcript Analyzer - ${data.studentInfo.name || 'Student'}</title>
            <meta charset="UTF-8">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
            <style>
                :root {
                    --primary-color: #3B82F6; --background-color: #F9FAFB; --card-bg: #FFFFFF;
                    --text-primary: #1F2937; --text-secondary: #6B7280; --border-color: #E5E7EB; 
                    --success-bg: #D1FAE5; --success-text: #065F46; --success-border: #10B981;
                    --warning-bg: #FEF3C7; --warning-text: #92400E;
                    --pending-bg: #FEF9C3; --pending-text: #92400E; --pending-border: #F59E0B;
                    --fail-bg: #FEE2E2; --fail-text: #991B1B; --fail-border: #EF4444;
                }
                body { 
                    font-family: 'Kanit', sans-serif; background-color: var(--background-color); 
                    padding: 2rem; color: var(--text-primary); font-weight: 300;
                    /* --- START: SCROLLBAR FIX --- */
                    overflow-y: scroll !important;
                    overflow-x: hidden !important;
                    /* --- END: SCROLLBAR FIX --- */
                }
                .container {
                    max-width: 1200px; margin: auto; background: var(--card-bg);
                    border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.04);
                    border: 1px solid var(--border-color);
                    /* --- START: CORNER RADIUS FIX --- */
                    overflow: hidden;
                    /* --- END: CORNER RADIUS FIX --- */
                }
                .header { background-color: var(--primary-color); color: white; padding: 2rem; text-align: center; }
                h1, h2, h3, h4 { margin: 0; font-weight: 500; }
                h1 { font-size: 2.25rem; font-weight: 700; }
                .content { padding: 2rem; }
                .student-info { text-align: center; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); }
                .student-info h2 { font-size: 1.75rem; font-weight: 600; }
                .student-info p { color: var(--text-secondary); font-size: 1rem; }
                
                .summary-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem; }
                .card { background: var(--background-color); padding: 1.5rem; border-radius: 12px; text-align: center; border: 1px solid var(--border-color);}
                .card-title { font-size: 0.9em; color: var(--text-secondary); margin-bottom: 0.5rem; font-weight: 400; }
                .card-value { font-size: 2.5em; font-weight: 600; color: var(--text-primary); line-height: 1; }
                
                .progress-bar { width: 100%; height: 28px; background: var(--border-color); border-radius: 14px; overflow: hidden; position: relative; }
                .progress-fill { height: 100%; background: var(--primary-color); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500; font-size: 0.9rem; transition: width 0.5s ease-in-out; }
                
                .status-message { text-align: center; padding: 1rem; border-radius: 12px; font-size: 1.1em; margin: 2rem 0; font-weight: 500; }
                .status-success { background: var(--success-bg); color: var(--success-text); }
                .status-warning { background: var(--warning-bg); color: var(--warning-text); }
                .section-header { font-size: 1.5rem; font-weight: 600; margin: 2.5rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--primary-color); }
                .year-group, .curriculum-section { margin-bottom: 1.5rem; border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; }
                .year-header, .curriculum-header { background: #fff; padding: 1rem 1.5rem; font-weight: 500; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); }
                .curriculum-header { background-color: var(--primary-color); color: white; font-size: 1.25rem; }
                .year-header h2 { font-size: 1.25rem; }
                .year-header .arrow, .curriculum-header .arrow { transition: transform 0.2s; }
                
                .year-content, .curriculum-content { padding: 1.5rem; background-color: var(--background-color); }
                .year-content.collapsed, .curriculum-content.collapsed, .semester-content.collapsed { display: none; }
                
                .semester-item { border: 1px solid var(--border-color); border-radius: 8px; overflow:hidden; margin-bottom: 1rem; background: #fff;}
                .semester-header { padding: 0.75rem 1rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: 400; }
                .semester-header:hover { background: #f9f9f9; }
                .semester-stats { font-size: 0.9em; color: var(--text-secondary); }

                .semester-item.empty .semester-header { cursor: default; background-color: var(--background-color); }
                .semester-item.empty .semester-header:hover { background-color: var(--background-color); }
                .semester-item.empty .semester-stats { font-style: italic; }

                .subject-table { width: 100%; border-collapse: collapse; }
                .subject-table th, .subject-table td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid var(--border-color); }
                .subject-table th { background: var(--background-color); font-weight: 500; font-size: 0.9em; }
                .subject-table tr:last-child td { border-bottom: none; }
                .subject-table .center { text-align: center; }
                .grade { padding: 4px 10px; border-radius: 15px; font-weight: 500; font-size: 0.85em; }
                .grade-A,.grade-A\\+ { background: var(--success-bg); color: var(--success-text); }
                .grade-B,.grade-B\\+, .grade-B- { background: #DBEAFE; color: #1E40AF; }
                .grade-C,.grade-C\\+, .grade-C- { background: #FEF9C3; color: #92400E; }
                .grade-D,.grade-D\\+, .grade-F, .grade-W, .grade-U { background: var(--fail-bg); color: var(--fail-text); }
                .grade-S { background: #E5E7EB; color: #374151; }
                .requirement-group { margin-bottom: 1rem; padding: 1.25rem; border-radius: 8px; border-left-width: 5px; border-left-style: solid; }
                .requirement-group.passed { border-left-color: var(--success-border); background-color: var(--success-bg); }
                .requirement-group.failed { border-left-color: var(--fail-border); background-color: var(--fail-bg); }
                .requirement-group.pending { border-left-color: var(--pending-border); background-color: var(--pending-bg); }
                
                .requirement-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
                .requirement-title { font-weight: 600; font-size: 1.1em; }
                .requirement-status { padding: 5px 15px; border-radius: 20px; font-weight: 500; color: white; font-size: 0.9em; }
                .status-pass { background-color: var(--success-border); } .status-fail { background-color: var(--fail-border); } .status-pending { background-color: var(--pending-border); }
                .requirement-details { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }
                .detail-item { padding: 0.75rem; background: rgba(255,255,255,0.6); border-radius: 6px; }
                .detail-label { font-size: 0.85em; color: var(--text-secondary); }
                .detail-value { font-weight: 600; font-size: 1.2em; }
                
                .courses-detail { margin-top: 1rem; font-size: 0.9em; }
                .courses-detail ul { margin: 5px 0 0 20px; padding: 0; list-style-type: '✓  '; }
                .courses-detail.missing ul { color: var(--fail-text); list-style-type: '✗  '; }
                .courses-detail.pending ul { color: var(--pending-text); list-style-type: '... '; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header"><h1>🎓 Transcript Analyzer</h1></div>
                <div class="content">
                    <div class="student-info">
                        <h2>${data.studentInfo.name || 'N/A'}</h2>
                        <p><strong>รหัสนักศึกษา:</strong> ${data.studentInfo.id || 'N/A'} | <strong>สาขาวิชา:</strong> ${data.studentInfo.major || 'N/A'}</p>
                    </div>
                    <div class="summary-cards">
                        <div class="card"><div class="card-title">หน่วยกิตทั้งหมด</div><div class="card-value">${data.totalAllCredits}</div>
                        <div style="font-size:0.8em;color:#888;">(ไม่นับวิชาที่เกรดยังไม่ออก)</div></div>
                        <div class="card"><div class="card-title">หน่วยกิตคงเหลือ</div><div class="card-value">${data.remaining}</div></div>
                        <div class="card"><div class="card-title">ความคืบหน้า</div><div class="card-value">${data.progress}%</div></div>
                        <div class="card">
                            <div class="card-title">เกรดเฉลี่ย (GPAX)</div>
                            <div class="card-value">${gpaText || '-'}</div>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width:${data.progress}%">${data.progress}% (${data.totalAllCredits}/129)</div>
                    </div>
                    <div class="status-message ${data.canGraduate ? 'status-success' : 'status-warning'}">${statusMessage}</div>
                    
                    <h3 class="section-header">การตรวจสอบเงื่อนไขหลักสูตร</h3>
                    ${curriculumHTML}

                    <h3 class="section-header">รายละเอียดตามภาคการศึกษา</h3>
                    ${semesterHTML}
                </div>
            </div>
            <script>
                function toggleContent(header) {
                    const content = header.nextElementSibling;
                    if (!content || (content.classList.contains('collapsed') && header.parentElement.classList.contains('empty'))) {
                        return;
                    }
                    const arrow = header.querySelector('.arrow');
                    content.classList.toggle('collapsed');
                    if (arrow) {
                        arrow.style.transform = content.classList.contains('collapsed') ? 'rotate(0deg)' : 'rotate(180deg)';
                    }
                }
                function toggleCurriculum(header) {
                   toggleContent(header);
                }
                window.focus();
            </script>
        </body>
        </html>`;
    }

    function createCurriculumCheckHTML(check) {
        let html = '<div class="curriculum-section"><div class="curriculum-header" onclick="toggleCurriculum(this)">📋 การตรวจสอบเงื่อนไขหลักสูตร <span class="arrow">▲</span></div><div class="curriculum-content">';
        html += '<h4 style="color:#3B82F6; margin:10px 0;">ก. หมวดวิชาศึกษาทั่วไป</h4>';
        Object.values(check.generalEducation?.groups || {}).forEach(g => { html += createGroupHTML(g); });
        html += '<h4 style="color:#3B82F6; margin:30px 0 10px 0;">ข. หมวดวิชาเฉพาะ</h4>';
        Object.values(check.majorCourses?.groups || {}).forEach(g => { html += createGroupHTML(g); });
        html += `<h4 style="color:#3B82F6; margin:30px 0 10px 0;">${check.freeElective.name}</h4>`;
        html += createGroupHTML(check.freeElective);
        html += '</div></div>';
        return html;
    }

    function createGroupHTML(g) {
        if (!g) return '';
        const getStatusInfo = (status) => {
            switch (status) { case 'passed': return { text: '✓ ผ่าน', class: 'pass' }; case 'pending': return { text: 'ⓘ รอผล', class: 'pending' }; default: return { text: '✗ ไม่ผ่าน', class: 'fail' }; }
        };
        const statusInfo = getStatusInfo(g.status);
        return `<div class="requirement-group ${g.status}">
            <div class="requirement-header">
                <div class="requirement-title">${g.name} ${g.note || ''}</div>
                <div class="requirement-status status-${statusInfo.class}">${statusInfo.text}</div>
            </div>
            <div class="requirement-details">
                <div class="detail-item"><div class="detail-label">ต้องการ</div><div class="detail-value">${g.required || 0}</div></div>
                <div class="detail-item"><div class="detail-label">ได้แล้ว</div><div class="detail-value">${g.earnedCredits || g.earned || 0}</div></div>
                <div class="detail-item"><div class="detail-label">คงเหลือ</div><div class="detail-value">${g.remaining || 0}</div></div>
            </div>
            ${g.takenCourses?.length > 0 ? `<div class="courses-detail"><strong>✓ วิชาที่ผ่านแล้ว:</strong><ul>${g.takenCourses.map(c => `<li>${c.code} - ${c.name}</li>`).join('')}</ul></div>` : ''}
            ${g.pendingCourses?.length > 0 ? `<div class="courses-detail pending"><strong>ⓘ กำลังรอผลเกรด:</strong><ul>${g.pendingCourses.map(c => `<li>${c.code} - ${c.name}</li>`).join('')}</ul></div>` : ''}
            ${g.missingCourses?.length > 0 ? `<div class="courses-detail missing"><strong>✗ วิชาที่ขาด:</strong><ul>${g.missingCourses.map(c => `<li>${c.code} - ${c.name}</li>`).join('')}</ul></div>` : ''}
        </div>`;
    }

    try {
        analysisData = analyzeTranscriptData();
        popupWindow = window.open('', 'TranscriptAnalyzer', 'width=1200,height=800,scrollbars=yes,resizable=yes');
        if (popupWindow) {
            popupWindow.document.write(createPopupHTML(analysisData));
            popupWindow.document.close();
            popupWindow.focus();
            console.log('\n🎓 Transcript Analysis Complete! Pop-up generated.');
        } else {
            alert('Popup ถูกบล็อก กรุณาอนุญาต Popup สำหรับเว็บไซต์นี้');
        }
    } catch (error) {
        console.error('❌ Analysis failed:', error);
        console.error('Stack:', error.stack);

        popupWindow = window.open('', 'TranscriptAnalyzerError', 'width=800,height=600,scrollbars=yes,resizable=yes');
        if (popupWindow) {
            popupWindow.document.write(`
                <html>
                    <head>
                        <title>Analysis Error</title>
                        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"><\/script>
                    </head>
                    <body>
                        <script>
                            Swal.fire({
                                icon: 'error',
                                title: 'เกิดข้อผิดพลาดร้ายแรง',
                                text: 'ไม่สามารถวิเคราะห์ข้อมูลได้: ${error.message.replace(/['`]/g, "\\'")}',
                                footer: '<pre style="text-align:left; white-space:pre-wrap; max-height: 200px; overflow-y: auto;">${error.stack.replace(/['`]/g, "\\'")}<\/pre>'
                            });
                        <\/script>
                    </body>
                </html>
            `);
            popupWindow.document.close();
            popupWindow.focus();
        } else {
            alert('เกิดข้อผิดพลาดร้ายแรงระหว่างการวิเคราะห์: ' + error.message);
        }
    }
})();
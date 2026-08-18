import type { CourseSection } from '@/lib/storefront-types';

import { CourseMetaIcon } from '@/components/brand-narrative/section-icons';

type CourseSectionViewProps = {
  section: CourseSection;
};

const metaIcons = ['clock', 'users', 'book'] as const;

export function CourseSectionView({ section }: CourseSectionViewProps) {
  return (
    <section className="section" data-od-id={section.id}>
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
          {section.lead ? <p className="lead">{section.lead}</p> : null}
        </div>
        <div className="course-grid">
          {section.courses.map((course) => (
            <div className="course-card" key={course.title}>
              {course.image ? (
                <div className="course-banner">
                  <img src={course.image} alt="" />
                  {course.badge ? <span className="course-badge">{course.badge}</span> : null}
                </div>
              ) : course.badge ? (
                <div className="course-banner course-banner-empty">
                  <span className="course-badge">{course.badge}</span>
                </div>
              ) : null}
              <div className="course-body">
                {course.kicker ? <div className="course-kicker">{course.kicker}</div> : null}
                <div className="course-title">{course.title}</div>
                {course.description ? <div className="course-desc">{course.description}</div> : null}
                {course.meta.length ? (
                  <div className="course-meta">
                    {course.meta.map((meta, index) => (
                      <span className="course-meta-item" key={meta}>
                        <CourseMetaIcon kind={metaIcons[index] ?? 'book'} />
                        {meta}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

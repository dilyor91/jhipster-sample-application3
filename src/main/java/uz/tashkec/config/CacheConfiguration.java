package uz.tashkec.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, uz.tashkec.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, uz.tashkec.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, uz.tashkec.domain.User.class.getName());
            createCache(cm, uz.tashkec.domain.Authority.class.getName());
            createCache(cm, uz.tashkec.domain.User.class.getName() + ".authorities");
            createCache(cm, uz.tashkec.domain.Popup.class.getName());
            createCache(cm, uz.tashkec.domain.Attachment.class.getName());
            createCache(cm, uz.tashkec.domain.Banner.class.getName());
            createCache(cm, uz.tashkec.domain.Logo.class.getName());
            createCache(cm, uz.tashkec.domain.Greeting.class.getName());
            createCache(cm, uz.tashkec.domain.CenterStructure.class.getName());
            createCache(cm, uz.tashkec.domain.OurHistory.class.getName());
            createCache(cm, uz.tashkec.domain.File.class.getName());
            createCache(cm, uz.tashkec.domain.WorkPlan.class.getName());
            createCache(cm, uz.tashkec.domain.Address.class.getName());
            createCache(cm, uz.tashkec.domain.News.class.getName());
            createCache(cm, uz.tashkec.domain.Events.class.getName());
            createCache(cm, uz.tashkec.domain.StudyAtKorea.class.getName());
            createCache(cm, uz.tashkec.domain.StudyAtKorea.class.getName() + ".files");
            createCache(cm, uz.tashkec.domain.TimeTable.class.getName());
            createCache(cm, uz.tashkec.domain.Institution.class.getName());
            createCache(cm, uz.tashkec.domain.Institution.class.getName() + ".files");
            createCache(cm, uz.tashkec.domain.AnswerAndQuestion.class.getName());
            createCache(cm, uz.tashkec.domain.Image.class.getName());
            createCache(cm, uz.tashkec.domain.Album.class.getName());
            createCache(cm, uz.tashkec.domain.Album.class.getName() + ".images");
            createCache(cm, uz.tashkec.domain.MaterialTopic.class.getName());
            createCache(cm, uz.tashkec.domain.FileTopic.class.getName());
            createCache(cm, uz.tashkec.domain.MaterialTopicLevel.class.getName());
            createCache(cm, uz.tashkec.domain.MaterialTopicLevel.class.getName() + ".fileTopics");
            createCache(cm, uz.tashkec.domain.Region.class.getName());
            createCache(cm, uz.tashkec.domain.Country.class.getName());
            createCache(cm, uz.tashkec.domain.Location.class.getName());
            createCache(cm, uz.tashkec.domain.Department.class.getName());
            createCache(cm, uz.tashkec.domain.Department.class.getName() + ".employees");
            createCache(cm, uz.tashkec.domain.Task.class.getName());
            createCache(cm, uz.tashkec.domain.Task.class.getName() + ".jobs");
            createCache(cm, uz.tashkec.domain.Employee.class.getName());
            createCache(cm, uz.tashkec.domain.Employee.class.getName() + ".jobs");
            createCache(cm, uz.tashkec.domain.Job.class.getName());
            createCache(cm, uz.tashkec.domain.Job.class.getName() + ".tasks");
            createCache(cm, uz.tashkec.domain.JobHistory.class.getName());
            createCache(cm, uz.tashkec.domain.Owner.class.getName());
            createCache(cm, uz.tashkec.domain.Owner.class.getName() + ".cars");
            createCache(cm, uz.tashkec.domain.Car.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}

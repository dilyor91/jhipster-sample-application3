package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.Greeting;
import uz.tashkec.repository.GreetingRepository;
import uz.tashkec.service.GreetingService;
import uz.tashkec.service.dto.GreetingDTO;
import uz.tashkec.service.mapper.GreetingMapper;

/**
 * Service Implementation for managing {@link Greeting}.
 */
@Service
@Transactional
public class GreetingServiceImpl implements GreetingService {

    private final Logger log = LoggerFactory.getLogger(GreetingServiceImpl.class);

    private final GreetingRepository greetingRepository;

    private final GreetingMapper greetingMapper;

    public GreetingServiceImpl(GreetingRepository greetingRepository, GreetingMapper greetingMapper) {
        this.greetingRepository = greetingRepository;
        this.greetingMapper = greetingMapper;
    }

    @Override
    public GreetingDTO save(GreetingDTO greetingDTO) {
        log.debug("Request to save Greeting : {}", greetingDTO);
        Greeting greeting = greetingMapper.toEntity(greetingDTO);
        greeting = greetingRepository.save(greeting);
        return greetingMapper.toDto(greeting);
    }

    @Override
    public GreetingDTO update(GreetingDTO greetingDTO) {
        log.debug("Request to update Greeting : {}", greetingDTO);
        Greeting greeting = greetingMapper.toEntity(greetingDTO);
        greeting = greetingRepository.save(greeting);
        return greetingMapper.toDto(greeting);
    }

    @Override
    public Optional<GreetingDTO> partialUpdate(GreetingDTO greetingDTO) {
        log.debug("Request to partially update Greeting : {}", greetingDTO);

        return greetingRepository
            .findById(greetingDTO.getId())
            .map(existingGreeting -> {
                greetingMapper.partialUpdate(existingGreeting, greetingDTO);

                return existingGreeting;
            })
            .map(greetingRepository::save)
            .map(greetingMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GreetingDTO> findAll() {
        log.debug("Request to get all Greetings");
        return greetingRepository.findAll().stream().map(greetingMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<GreetingDTO> findOne(Long id) {
        log.debug("Request to get Greeting : {}", id);
        return greetingRepository.findById(id).map(greetingMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Greeting : {}", id);
        greetingRepository.deleteById(id);
    }
}
